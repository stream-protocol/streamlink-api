import { StreamLink } from '../models/StreamLink';

const MESSAGES = {
    GENERATED: (url: string) => `Generated StreamLink: ${url}`,
    RETRIEVED_FROM_URL: (key: string) => `Retrieved Keypair from URL: ${key}`,
    RETRIEVED_FROM_LINK: (key: string) => `Retrieved Keypair from string link: ${key}`,
    ERROR: (error: string) => `An error occurred: ${error}`
};

async function createAndLogStreamLink() {
    const streamlink = await StreamLink.create();
    console.log(MESSAGES.GENERATED(streamlink.url.toString()));
    return streamlink;
}

async function retrieveFromUrlAndLog(streamlink: StreamLink) {
    const url = new URL(streamlink.url.toString());
    const retrievedStreamLink = await StreamLink.fromUrl(url);
    console.log(MESSAGES.RETRIEVED_FROM_URL(retrievedStreamLink.keypair.publicKey.toString()));
}

async function retrieveFromLinkAndLog(streamlink: StreamLink) {
    const link = streamlink.url.toString();
    const retrievedFromLink = await StreamLink.fromLink(link);
    console.log(MESSAGES.RETRIEVED_FROM_LINK(retrievedFromLink.keypair.publicKey.toString()));
}

async function main() {
    try {
        const streamlink = await createAndLogStreamLink();
        await retrieveFromUrlAndLog(streamlink);
        await retrieveFromLinkAndLog(streamlink);
    } catch (error) {
        console.error(MESSAGES.ERROR(error.message));
    }
}

main();
