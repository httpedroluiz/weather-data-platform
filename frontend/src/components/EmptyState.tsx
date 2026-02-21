import { InfoCard } from "./InfoCard";

interface Props {
  title: string;
  message: string;
}

export function EmptyState({ title, message }: Props) {
  return (
    <InfoCard title={title}>
      <p className="text-sm text-muted-foreground">
        {message}
      </p>
    </InfoCard>
  );
}