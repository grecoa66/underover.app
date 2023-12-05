"use client"; // Error components must be Client Components

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div className="flex h-36 w-full flex-col items-center justify-center">
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
    </div>
  );
}
