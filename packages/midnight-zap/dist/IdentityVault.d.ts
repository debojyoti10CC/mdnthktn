export declare class IdentityVault {
    private db;
    private cryptoKey;
    private constructor();
    /**
     * Initializes the vault natively, triggering WebAuthn passkey flow
     * to unlock or create the encryption material.
     */
    static open(userId?: string): Promise<IdentityVault>;
    private initDB;
    /**
     * Genuine WebAuthn flow to derive a stable encryption key.
     * If PRF is available it uses it, otherwise falls back to a locally stored salt
     * mixed with the WebAuthn ID for AES derivation.
     */
    private deriveEncryptionKey;
    /**
     * Sets an attribute, symmetrically encrypting it via the derived passkey material.
     */
    set(key: string, value: any): Promise<void>;
    /**
     * Retrieves and decrypts an attribute.
     */
    get(key: string): Promise<any>;
}
