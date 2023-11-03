import SkeletonCard from "./components/Skeleton";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto pt-8 px-8 xl:px-0">
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-5">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index}>
            <SkeletonCard isLoading />
          </div>
        ))}
      </section>
    </div>
  );
}
