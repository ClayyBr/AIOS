import { describe, it, expect } from 'vitest';
import crypto from 'crypto';
import { validateSignature } from '../../src/utils/signature';

describe('validateSignature', () => {
    const appSecret = 'test_app_secret_12345';

    function generateValidSignature(payload: string, secret: string): string {
        return (
            'sha256=' +
            crypto.createHmac('sha256', secret).update(payload).digest('hex')
        );
    }

    it('should return true for valid signature', () => {
        const payload = '{"test": "data"}';
        const signature = generateValidSignature(payload, appSecret);

        expect(validateSignature(payload, signature, appSecret)).toBe(true);
    });

    it('should return false for invalid signature', () => {
        const payload = '{"test": "data"}';
        const signature = 'sha256=invalid_signature_hex_value_that_is_wrong';

        expect(validateSignature(payload, signature, appSecret)).toBe(false);
    });

    it('should return false for tampered payload', () => {
        const originalPayload = '{"test": "data"}';
        const tamperedPayload = '{"test": "tampered"}';
        const signature = generateValidSignature(originalPayload, appSecret);

        expect(validateSignature(tamperedPayload, signature, appSecret)).toBe(false);
    });

    it('should return false for wrong app secret', () => {
        const payload = '{"test": "data"}';
        const signature = generateValidSignature(payload, appSecret);

        expect(validateSignature(payload, signature, 'wrong_secret')).toBe(false);
    });

    it('should return false for empty signature', () => {
        const payload = '{"test": "data"}';

        expect(validateSignature(payload, '', appSecret)).toBe(false);
    });

    it('should return false for empty app secret', () => {
        const payload = '{"test": "data"}';
        const signature = generateValidSignature(payload, appSecret);

        expect(validateSignature(payload, signature, '')).toBe(false);
    });

    it('should handle Buffer payload', () => {
        const payload = Buffer.from('{"test": "data"}');
        const signature = generateValidSignature(payload.toString(), appSecret);

        expect(validateSignature(payload, signature, appSecret)).toBe(true);
    });

    it('should handle signature without sha256= prefix', () => {
        const payload = '{"test": "data"}';
        // Missing "sha256=" prefix — should fail
        const hash = crypto.createHmac('sha256', appSecret).update(payload).digest('hex');

        expect(validateSignature(payload, hash, appSecret)).toBe(false);
    });
});
