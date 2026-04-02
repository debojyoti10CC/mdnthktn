// zkSession verifies the sessionToken returned by zkLogin
export class zkSession {
  /**
   * Verifies the session by querying the Midnight Network blockchain
   * (or a Verifier service caching it) for the presence of the session nonce.
   */
  static async verify(token: string): Promise<{ valid: boolean; claims?: Record<string, boolean>; expiresAt?: Date }> {
    try {
      const res = await fetch(process.env.MIDNIGHT_NETWORK_URL || "https://your-midnight-node/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proof: token,
          contract: "MidnightZap",
        }),
      });

      const { valid, verifiedClaims, expiresAt } = await res.json();
      
      return {
          valid,
          claims: verifiedClaims,
          expiresAt: expiresAt ? new Date(expiresAt) : new Date(Date.now() + 15 * 60 * 1000)
      };
    } catch (e) {
      console.error("zkSession RPC Error:", e);
      return { valid: false };
    }
  }
}
