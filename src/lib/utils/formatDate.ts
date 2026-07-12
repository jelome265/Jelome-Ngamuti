export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}

export function formatDateRange(start: string, end?: string): string {
  const startFormatted = formatDate(start);
  if (!end) return `${startFormatted} — Present`;
  return `${startFormatted} — ${formatDate(end)}`;
}
