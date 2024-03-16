import { Skeleton } from "@/components/ui/skeleton"

const SkeletonTable = () => {
    return (
        <div className="flex flex-col space-y-4">
          <Skeleton className="h-[40px] w-full" />
          <Skeleton className="h-[20px] w-full" />
          <Skeleton className="h-[20px] w-full" />
          <Skeleton className="h-[20px] w-full" />
          <Skeleton className="h-[20px] w-full" />
          <Skeleton className="h-[20px] w-full" />
          <Skeleton className="h-[20px] w-full" />
        </div>
      )
}

export default SkeletonTable