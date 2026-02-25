export function trendVariant(trend: string) {
  switch (trend) {
    case "subindo":
      return "destructive";
    case "caindo":
      return "secondary";
    case "estável":
      return "outline";
    default:
      return "outline";
  }
}

export function classificationVariant(classification: string) {
  switch (classification.toLowerCase()) {
    case "quente":
      return "destructive";
    case "frio":
      return "secondary";
    case "agradável":
      return "default";
    default:
      return "outline";
  }
}