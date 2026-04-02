import { IdentityVault } from './IdentityVault';
import { ProofEngine } from './ProofEngine';
export class zkLogin {
    /**
     * Initializes the ZK Login flow.
     * 1. Opens Identity Vault via Passkey.
     * 2. Checks attributes against requested claims.
     * 3. Generates genuine zero-knowledge proof.
     * 4. Returns proof session token.
     */
    static async request(params) {
        // 1. Open vault (triggers passkey flow to derive AES keys and decrypt IndexedDB)
        const vault = await IdentityVault.open(params.userId);
        // 2 & 3. Evaluate Claims locally and generate proof via WASM
        const proofResult = await ProofEngine.executeClaims(vault, params.claims);
        const allClaimsVerified = params.claims.every(c => proofResult.verifiedClaims[c.predicate] === true);
        if (!allClaimsVerified) {
            return { verified: false, sessionToken: '', proofPayload: null };
        }
        return {
            verified: true,
            sessionToken: proofResult.sessionToken,
            proofPayload: proofResult.payload
        };
    }
}
