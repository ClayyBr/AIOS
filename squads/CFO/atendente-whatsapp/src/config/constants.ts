export const CONSTANTS = {
    // Session
    MAX_HISTORY_LENGTH: 20,
    CLEANUP_INTERVAL_MS: 5 * 60 * 1000, // 5 minutes

    // Retry
    MAX_RETRIES: 3,
    RETRY_BASE_DELAY_MS: 1000,

    // Timeouts
    META_API_TIMEOUT_MS: 10_000,
    GEMINI_API_TIMEOUT_MS: 15_000,
    SHEETS_API_TIMEOUT_MS: 10_000,

    // Meta API
    META_API_VERSION: 'v21.0',
    META_API_BASE_URL: 'https://graph.facebook.com',

    // Gemini
    GEMINI_MODEL: 'gemini-1.5-flash',
    GEMINI_TEMPERATURE: 0.3,

    // Order
    COMANDA_PATTERN: /####\s*NOVO PEDIDO\s*####/i,
} as const;
