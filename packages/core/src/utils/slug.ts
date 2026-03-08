/**
 * Replaces all non-alphanumeric characters with underscores and converts to lowercase.
 */
export function slug(s: string) {
    return s.replaceAll(/[^\dA-Za-z]+/g, '_').replaceAll(/^_+|_+$/g, '').toLowerCase();
}
