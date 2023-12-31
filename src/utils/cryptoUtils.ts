// utils/cryptoUtils.ts
import _sodium from "libsodium-wrappers-sumo";
import { encode as b58encode, decode as b58decode } from "bs58";

// Move constants to a configuration file
const DEFAULT_STREAMLINK_KEYLENGTH = 12;
const STREAMLINK_ORIGIN = "https://streamlink.xyz";
const STREAMLINK_PATH = "/i";

// Initialize sodium once
let sodiumInitialized = false;

async function initializeSodium() {
  if (!sodiumInitialized) {
    await _sodium.ready;
    sodiumInitialized = true;
  }
}

async function getSodium() {
  await initializeSodium();
  return _sodium;
}

async function kdf(fullLength: number, pwShort: Uint8Array, salt: Uint8Array) {
  const sodium = await getSodium();
  return sodium.crypto_pwhash(
    fullLength,
    pwShort,
    salt,
    sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
    sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE,
    sodium.crypto_pwhash_ALG_DEFAULT
  );
}

async function randBuf(l: number) {
  const sodium = await getSodium();
  return sodium.randombytes_buf(l);
}

async function kdfz(fullLength: number, pwShort: Uint8Array) {
  const sodium = await getSodium();
  const salt = new Uint8Array(sodium.crypto_pwhash_SALTBYTES);
  return await kdf(fullLength, pwShort, salt);
}

async function pwToKeypair(pw: Uint8Array) {
  const sodium = await getSodium();
  const seed = await kdfz(sodium.crypto_sign_SEEDBYTES, pw);
  return Keypair.fromSeed(seed);
}

export {
  DEFAULT_STREAMLINK_KEYLENGTH,
  STREAMLINK_ORIGIN,
  STREAMLINK_PATH,
  kdf,
  randBuf,
  kdfz,
  pwToKeypair,
};
