/**
 * Validates the X-Hub-Signature-256 header from Meta webhooks.
 * Uses HMAC-SHA256 with the app secret to verify payload integrity.
 *
 * @param rawBody - Raw request body as string/buffer
 * @param signature - Value of X-Hub-Signature-256 header
 * @param appSecret - Meta App Secret
 * @returns true if signature is valid
 */
export declare function validateSignature(rawBody: string | Buffer, signature: string, appSecret: string): boolean;
//# sourceMappingURL=signature.d.ts.map