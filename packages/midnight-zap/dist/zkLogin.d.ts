import { ClaimRequest } from './ProofEngine';
export interface ZkLoginRequest {
    appId: string;
    claims: ClaimRequest[];
    sessionExpiry?: string;
    userId?: string;
}
export declare class zkLogin {
    /**
     * Initializes the ZK Login flow.
     * 1. Opens Identity Vault via Passkey.
     * 2. Checks attributes against requested claims.
     * 3. Generates genuine zero-knowledge proof.
     * 4. Returns proof session token.
     */
    static request(params: ZkLoginRequest): Promise<{
        verified: boolean;
        sessionToken: string;
        proofPayload: any;
    }>;
}
