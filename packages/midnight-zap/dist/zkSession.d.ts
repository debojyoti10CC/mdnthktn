export declare class zkSession {
    /**
     * Verifies the session by querying the Midnight Network blockchain
     * (or a Verifier service caching it) for the presence of the session nonce.
     */
    static verify(token: string): Promise<{
        valid: boolean;
        claims?: Record<string, boolean>;
        expiresAt?: Date;
    }>;
}
