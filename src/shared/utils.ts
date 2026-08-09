import { randomBytes } from 'node:crypto';

export function generateId(): string {
  return randomBytes(9).toString('base64url');
}

export function escapeHtml(value: string): string {
  return String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string)
  );
}