import { createHash } from 'crypto';

export default function Hash(text) {
  const hash = createHash('sha256');
  hash.update(text);
  const digest = hash.digest('hex');
  return digest;
}
