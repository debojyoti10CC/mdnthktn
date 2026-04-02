import { IdentityVault } from './IdentityVault';
export type ZKProofPayload = {
    proof: string;
    publicSignals: string[];
    circuit: "verifyAge" | "verifyBooleanClaim";
};
export interface ProofResult {
    payload: ZKProofPayload;
    sessionToken: string;
    verifiedClaims: Record<string, boolean>;
}
export interface ClaimRequest {
    predicate: string;
}
export declare class ProofEngine {
    /**
     * Generates a genuine ZK Proof using the Midnight Network compiled circuits
     * against the private state held in IdentityVault.
     */
    static executeClaims(vault: IdentityVault, claims: ClaimRequest[]): Promise<ProofResult>;
}
