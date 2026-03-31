export default function Loading() {
  return (
    <div className="container max-w-4xl px-4 py-20 flex flex-col gap-12">
      <div className="h-12 w-2/3 bg-muted animate-pulse rounded-xl" />
      <div className="h-6 w-1/3 bg-muted animate-pulse rounded-xl" />
      
      <div className="flex flex-col gap-8 mt-12">
        <div className="h-64 w-full bg-muted animate-pulse rounded-3xl" />
        <div className="space-y-4">
           <div className="h-4 w-full bg-muted animate-pulse rounded" />
           <div className="h-4 w-full bg-muted animate-pulse rounded" />
           <div className="h-4 w-5/6 bg-muted animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
}
