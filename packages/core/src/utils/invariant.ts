import assert from 'node:assert'

export function invariant(
  condition: unknown,
  message = 'Unexpected invariant violation',
): asserts condition {
  if (!condition) {
    assert(
      condition,
      `[astrobook] Unexpected internal error. Please open an issue at https://github.com/ocavue/astrobook/issues. ${message}`,
    )
  }
}
