import { Skeleton } from "@/components/ui/skeleton";
import { InfoCard } from "@/components/InfoCard";

export function DashboardSkeleton() {
  return (
    <div className="p-10 space-y-8">
      <Skeleton className="h-10 w-64" />

      <div className="grid gap-6 md:grid-cols-2">
        <InfoCard title="Clima Atual">
          <div className="space-y-3">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-52" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-48" />
          </div>
        </InfoCard>

        <InfoCard title="Insights">
          <div className="space-y-3">
            <Skeleton className="h-4 w-44" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-full" />
          </div>
        </InfoCard>
      </div>
    </div>
  );
}