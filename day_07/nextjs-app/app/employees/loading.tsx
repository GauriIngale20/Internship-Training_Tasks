export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <div className="h-4 w-40 animate-pulse rounded bg-gray-300" />
          <div className="mt-3 h-9 w-56 animate-pulse rounded bg-gray-300" />
          <div className="mt-3 h-5 w-80 animate-pulse rounded bg-gray-200" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="rounded-2xl bg-white p-6 shadow-md"
            >
              <div className="h-6 w-32 animate-pulse rounded bg-gray-300" />
              <div className="mt-3 h-4 w-20 animate-pulse rounded bg-gray-200" />
              <div className="mt-6 h-4 w-40 animate-pulse rounded bg-gray-200" />
              <div className="mt-3 h-4 w-48 animate-pulse rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}