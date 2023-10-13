import { StreamLink } from "../src/utils";

test("returns valid StreamLink", () => {
    return StreamLink.create().then((streamLink: StreamLink) => {
        expect(typeof streamLink.url.hash).toBe('string');
        expect(typeof streamLink.keypair.publicKey.toBase58()).toBe('string');
    });
})

test("matches website", () => {
    return StreamLink.fromLink('https://streamlink.zyx/i#5jC3aFcBJR4g4BQ5D').then((streamLink: StreamLink) => {
        expect(streamLink.url.hash).toBe('#5jC3aFcBJR4g4BQ5D');
        expect(streamLink.keypair.publicKey.toBase58()).toBe('6xcGWYuk9HMCPiEeu1AtHAZdEpFt97Qi6JCuKCVyph4');
    });
})