import pika
import json
import os

_connection = None

def _get_connection():
    global _connection
    if _connection is None or not _connection.is_open:
        _connection = pika.BlockingConnection(
            pika.ConnectionParameters(host=os.getenv("RABBITMQ_HOST"))
        )
    return _connection

def send_to_queue(message: dict):
    global _connection
    conn = _get_connection()
    channel = None
    try:
        channel = conn.channel()
        channel.queue_declare(queue=os.getenv("RABBITMQ_QUEUE"), durable=True)
        channel.basic_publish(
            exchange="",
            routing_key=os.getenv("RABBITMQ_QUEUE"),
            body=json.dumps(message, default=str),
            properties=pika.BasicProperties(delivery_mode=2),
        )
    except Exception:
        try:
            if _connection and _connection.is_open:
                _connection.close()
        except Exception:
            pass
        _connection = None
        raise
    finally:
        if channel and channel.is_open:
            try:
                channel.close()
            except Exception:
                pass
