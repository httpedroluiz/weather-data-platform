export function formatDate(date: string) {
  return new Date(date).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

export function weatherCodeToText(code: number) {
  const map: Record<number, string> = {
    0: "Céu limpo",
    1: "Poucas nuvens",
    2: "Parcialmente nublado",
    3: "Nublado",
  };

  return map[code] ?? "Condição desconhecida";
}