export function capitalize(string: string): string {
  return string.at(0)?.toUpperCase() + string.slice(1);
}
