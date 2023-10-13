# StreamLink API

[Full Documentation](https://docs.streamlink.xyz)


# What is StreamLink?

StreamLink is a lightweight wallet designed to make transferring digital assets as easy as sending a link. Our non-custodial wallet allows you to have complete control of your assets by connecting your Gmail account or Solana wallet.

Someone with crypto can create a StreamLink and send that link to anyone over any platform (text, discord, email, etc). The amazing thing is, the link is the wallet!

StreamLink offers the benefits of decentralization and self-custody without worrying about seed phrases, arcane key management, apps, and browser extensions.


Sure! Structuring your code well, especially for larger projects, is essential for maintainability and readability. Here's a suggested folder and file structure for your current module:

```
📁 src
│
├── 📁 utils
│   ├── sodium.ts       // contains functions related to sodium (initializeSodium, kdf, randBuf, kdfz)
│   └── encoding.ts     // contains functions related to encoding like b58encode and b58decode
│
├── 📁 config
│   └── index.ts        // contains the CONFIG object
│
├── 📁 models
│   └── StreamLink.ts   // contains the StreamLink class
│
└── index.ts            // main entry point that brings together everything
```

- **src**: This is the main source directory. All your TypeScript source code resides here.
- **utils**: Utility functions that can be used across multiple parts of the application. Here, you can put `sodium` related functions and encoding functions.
- **config**: Configuration-related code, constants, and settings that your application might require.
- **models**: Domain or entity models that represent main parts of your application.

### Overview

1. **sodium.ts**:
   ```typescript
   import _sodium from "libsodium-wrappers-sumo";

   let sodiumInstance: any;

   export const initializeSodium = async() => {
       // ... the function remains unchanged ...
   };

   export const kdf = async (fullLength: number, pwShort: Uint8Array, salt: Uint8Array) => {
       // ... the function remains unchanged ...
   };

   // ... other sodium related functions ...
   ```

2. **encoding.ts**:
   ```typescript
   import { encode as b58encode, decode as b58decode } from "bs58";

   // you can export b58encode and b58decode directly or create custom functions
   ```

3. **index.ts in config**:
   ```typescript
   export const CONFIG = {
       DEFAULT_STREAMLINK_KEYLENGTH: 12,
       STREAMLINK_ORIGIN: "https://streamlink.xyz",
       STREAMLINK_PATH: "/i"
   };
   ```

4. **StreamLink.ts**:
   ```typescript
   import { Keypair } from '@solana/web3.js';
   import { CONFIG } from '../config';
   import { initializeSodium, kdf, randBuf, kdfz } from '../utils/sodium';
   import { b58encode, b58decode } from '../utils/encoding';

   export class StreamLink {
       // ... the class remains unchanged ...
   }
   ```

5. **index.ts** (main entry):
   ```typescript
   export * from './config';
   export * from './models/StreamLink';
   ```

Now, when you want to use the `StreamLink` class in another module, you'd import it like this:

```typescript
import { StreamLink } from './src';
```

This structure allows you to easily extend your project in the future and helps keep related functionalities grouped together.


# Basic Installation instructions
```bash
npm install @tiplink/api
```
Import Instructions
```js
import { TipLink } from '@tiplink/api';
```
Create a TipLink
```js
TipLink.create().then(tiplink => {
  console.log("link: ", tiplink.url.toString());
  console.log("publicKey: ", tiplink.keypair.publicKey.toBase58());
  return tiplink;
});
```
```js
const tp = 'https://tiplink.io/i#TIPLINK_HASH';
TipLink.fromLink(tp).then(tiplink => {
  console.log("converted publicKey: ", tiplink.keypair.publicKey.toBase58());
  return tiplink;
});
```
