# MidnightZap

**MidnightZap is an open-source TypeScript SDK that lets any web2 developer add zero-knowledge-powered authentication and identity proofs to their application in under 5 minutes.**

Where **StarkZap** collapsed weeks of crypto payment integration work into a single `npm install` for web2 developers, **MidnightZap** applies that exact same philosophy to a different, unsolved problem: **Identity**.

Instead of asking a user *who* they are, an application asks *what they can prove*. MidnightZap handles the heavy lifting of Private State storage, ZK-SNARK circuit generation, and Midnight Network validation under the hood.

---

##  How It Works (Under the Hood)

When a user visits an application utilizing MidnightZap, the flow breaks down into two core abstractions that the developer never has to manually wire:

### 1. The Identity Vault (Client-Side)
User data (like an Age, Identity Document, or Location) must live somewhere. Instead of a centralized database, the SDK initializes a strict **Vault** entirely within the user's browser (IndexedDB).
- **Security:** Natively utilizes **WebAuthn Passkeys** (FaceID / TouchID / Windows Hello) to derive an AES-256-GCM encryption key.
- **Privacy:** Information is encrypted symmetrically and never leaves the user's disk.

### 2. The Proof Engine
When an application requests verification (e.g., `age >= 18`), the `zkLogin` module quietly loads a WebAssembly (WASM) compiler of the Midnight Network's `.compact` smart contract. 
- The ZK Circuit executes locally against the decrypted Vault data.
- It produces a mathematical boolean (SNARK proof) that mathematically guarantees the data satisfies the claim without revealing the data itself.
- That proof is verified against the `MidnightZap` native contract on the Midnight Network testnet.

---

## 🛠️ How Web2 Developers Use It

MidnightZap requires **zero blockchain leakages**. Developers don't need to know what a SNARK is, they don't need to hold DUST tokens, and they don't need to learn the `Compact` compiler.

### Installation
```bash
npm install midnight-zap
```

### 1. The Frontend Trigger
Request a Zero-Knowledge proof directly from a client component:

```typescript
import { zkLogin } from 'midnight-zap';

// Pops open the Passkey prompt and executes the ZK WASM circuit in the background
const result = await zkLogin.request({
  appId: 'demo-app',
  claims: [
    { predicate: 'age >= 18' },
    { predicate: 'country NOT_IN ["IRN", "PRK", "SYR"]' }
  ]
});

// The server merely receives the opaque session Token. No birthdates or countries.
document.cookie = `midnight_zap_session=${result.sessionToken}; path=/`;
```

### 2. The Server Middleware (Next.js Example)
Drop the Middleware into your edge router to validate the Session against the Midnight Network automatically:

```typescript
import { zkMiddleware } from 'midnight-zap';

export const config = {
  matcher: '/premium/:path*',
};

export default zkMiddleware({
  required: ['age >= 18'], // Only let authenticated sessions matching this criteria through
  redirect: '/access-denied',
});
```

That's it. Two files edited, and your Next.js app has mathematically strict KYC compliance with absolutely zero GDPR overhead or personal data stored on your tables.
