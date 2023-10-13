import { StreamLink } from "../src/utils";

test("StreamLink creation returns valid URL and keypair", async() => {
    const streamLink = await StreamLink.create();
    expect(typeof streamLink.url.hash).toBe('string');
    expect(typeof streamLink.keypair.publicKey.toBase58()).toBe('string');
});

test("StreamLink retrieval from URL matches input", async() => {
    const expectedHash = '5jC3aFcBJR4g4BQ5D';
    const expectedPublicKey = '6xcGWYuk9HMCPiEeu1AtHAZdEpFt97Qi6JCuKCVyph4';

    const streamLink = await StreamLink.fromLink(`https://streamlink.xyz/i#${expectedHash}`);

    expect(streamLink.url.hash).toBe(`#${expectedHash}`);
    expect(streamLink.keypair.publicKey.toBase58()).toBe(expectedPublicKey);
});