// Debounce function for search input
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<F extends (...args: any[]) => unknown>(
  func: F,
  waitFor: number
): (...args: Parameters<F>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<F>): void => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };
}

// Format song duration from seconds to MM:SS
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Generate a random color for playlist covers with no image
export function getRandomColor(): string {
  const colors = [
    'bg-blue-600',
    'bg-green-600',
    'bg-red-600',
    'bg-yellow-600',
    'bg-purple-600',
    'bg-pink-600',
    'bg-indigo-600',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
