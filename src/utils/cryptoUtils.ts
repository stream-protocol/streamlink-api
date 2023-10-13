import _sodium from "libsodium-wrappers-sumo";

let sodiumInstance: any;

/**
 * Initialize sodium and return the instance.
 */
async function getSodiumInstance(): Promise<any> {
    if (!sodiumInstance) {
        await _sodium.ready;
        sodiumInstance = _sodium;
    }
    return sodiumInstance;
}

/**
 * Derive a key from a password and salt using sodium's crypto_pwhash.
 * 
 * @param fullLength - Desired length of the derived key.
 * @param pwShort - The password from which the key will be derived.
 * @param salt - A salt to use for the derivation. 
 */
export async function deriveKey(fullLength: number, pwShort: Uint8Array, salt: Uint8Array): Promise<Uint8Array> {
    const sodium = await getSodiumInstance();
    return sodium.crypto_pwhash(
        fullLength,
        pwShort,
        salt,
        sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
        sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE,
        sodium.crypto_pwhash_ALG_DEFAULT
    );
}

/**
 * Generate a random buffer of a given length using sodium.
 * 
 * @param length - Length of the random buffer.
 */
export async function generateRandomBuffer(length: number): Promise<Uint8Array> {
    const sodium = await getSodiumInstance();
    return sodium.randombytes_buf(length);
}

/**
 * Derive a key from a password using a zeroed salt.
 * 
 * @param fullLength - Desired length of the derived key.
 * @param pwShort - The password from which the key will be derived.
 */
export async function deriveKeyWithZeroSalt(fullLength: number, pwShort: Uint8Array): Promise<Uint8Array> {
    const sodium = await getSodiumInstance();
    const salt = new Uint8Array(sodium.crypto_pwhash_SALTBYTES);
    return deriveKey(fullLength, pwShort, salt);
}

// Ensure sodium instance is initialized on module import.
getSodiumInstance();
