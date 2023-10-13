import { Keypair } from '@solana/web3.js';
import _sodium from "libsodium-wrappers-sumo";
import { encode as b58encode, decode as b58decode } from "bs58";

const DEFAULT_STREAMLINK_KEYLENGTH = 12;
const STREAMLINK_ORIGIN = "https://streamlink.xyz";
const STREAMLINK_PATH = "/i";

async function getSodium() {
  await _sodium.ready;
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

export class StreamLink {
  url: URL;
  keypair: Keypair;

  private constructor(url: URL, keypair: Keypair) {
    this.url = url;
    this.keypair = keypair;
  }

  public static async create(): Promise<StreamLink> {
    const sodium = await getSodium();
    const randomBytes = await randBuf(DEFAULT_STREAMLINK_KEYLENGTH);
    const keypair = await pwToKeypair(randomBytes);
    const hash = b58encode(randomBytes);
    const urlString = `${STREAMLINK_ORIGIN}${STREAMLINK_PATH}#${hash}`;
    const link = new URL(urlString);
    const streamlink = new StreamLink(link, keypair);
    return streamlink;
  }

  public static async fromUrl(url: URL): Promise<StreamLink> {
    const slug = url.hash.slice(1);
    const pw = Uint8Array.from(b58decode(slug));
    const keypair = await pwToKeypair(pw);
    const streamlink = new StreamLink(url, keypair);
    return streamlink;
  }

  public static async fromLink(link: string): Promise<StreamLink> {
    const url = new URL(link);
    return this.fromUrl(url);
  }
}
