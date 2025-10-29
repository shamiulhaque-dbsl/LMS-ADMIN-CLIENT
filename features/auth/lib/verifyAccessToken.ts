import { jwtVerify, importSPKI } from "jose";

let cachedRS256Key: CryptoKey | null = null;

/**
 * Verifies a JWT access token.
 * Supports RS256 (asymmetric) and HS256 (symmetric) tokens.
 *
 * @param token JWT string
 * @param algorithm Optional: "RS256" | "HS256" (auto-detect if omitted)
 * @returns payload object if valid, null if invalid/expired
 */
export async function verifyAccessToken(token?: string, algorithm?: "RS256" | "HS256") {
  if (!token) return null;

  try {
    const alg = algorithm || process.env.TOKEN_ALG || "RS256";

    if (alg === "RS256") {
      // Load & cache RSA public key
      if (!cachedRS256Key) {
        const publicKey = process.env.TOKEN_VERIFY_KEY;
        if (!publicKey) throw new Error("Missing TOKEN_VERIFY_KEY in env");
        cachedRS256Key = await importSPKI(publicKey, "RS256");
      }

      const { payload } = await jwtVerify(token, cachedRS256Key, { algorithms: ["RS256"] });
      return payload;
    }

    if (alg === "HS256") {
      const secret = process.env.TOKEN_VERIFY_KEY;
      if (!secret) throw new Error("Missing TOKEN_VERIFY_KEY for HS256 in env");

      const { payload } = await jwtVerify(token, new TextEncoder().encode(secret), {
        algorithms: ["HS256"],
      });
      return payload;
    }

    throw new Error(`Unsupported algorithm: ${alg}`);
  } catch (err) {
    return null;
  }
}
