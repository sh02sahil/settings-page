import Skeleton from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex w-full flex-col items-start gap-8 px-6 py-11 sm:px-32 xl:px-16">
      <div className="flex w-full flex-col items-start gap-4">
        <Skeleton className="h-8 w-1/2 xl:w-1/4" />
        <Skeleton className="w-full" />
        <div className="flex w-full gap-4">
          <Skeleton className="w-full" />
          <Skeleton className="w-full" />
        </div>
        <Skeleton className="w-full" />
        <Skeleton className="w-[20%] self-end" />
      </div>
      <div className="flex w-full flex-col items-start gap-4">
        <Skeleton className="h-8 w-1/2 xl:w-1/4" />
        <Skeleton className="h-6 w-2/3 xl:w-1/3" />
        <Skeleton className="aspect-square h-1/4 w-1/2 xl:h-[30%] xl:w-[30%]" />
      </div>
    </div>
  );
}
