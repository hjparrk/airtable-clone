export default function LoadingSpinner() {
  return (
    <div className="flex h-32 items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"></div>
    </div>
  );
}
