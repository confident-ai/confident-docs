export function formatStars(n) {
  return n >= 1_000_000
  ? `${Math.floor(n / 1_000_000)}M+`
  : n >= 1_000
  ? `${Math.floor(n / 1_000)}k+`
    : n.toString();
}