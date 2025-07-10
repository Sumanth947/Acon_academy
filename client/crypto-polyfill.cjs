// client/crypto-polyfill.js
const { webcrypto } = require('crypto');

// If Vite asks for crypto.hash, forward to subtle.digest
globalThis.crypto = {
  subtle: webcrypto.subtle,
  getRandomValues: webcrypto.getRandomValues.bind(webcrypto),
  hash: (algorithm, data) => webcrypto.subtle.digest(algorithm, data),
};
