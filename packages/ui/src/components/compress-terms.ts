export function compressTerms(terms: readonly string[]): readonly string[] {
  const unique = Array.from(new Set(terms.map((k) => k.toLowerCase())))
  return unique
    .filter(
      (term) => !unique.some((other) => other !== term && other.includes(term)),
    )
    .sort()
}
