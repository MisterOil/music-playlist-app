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
