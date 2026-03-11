import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ReactNode } from "react";

interface Props {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}

export function InfoCard({ title, icon, children }: Props) {
  return (
    <Card className="bg-blue-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          {icon ? (
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-background/50 text-foreground">
              {icon}
            </span>
          ) : null}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}
