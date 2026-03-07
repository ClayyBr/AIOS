import { google, sheets_v4 } from 'googleapis';
import { env } from '../config/env';
import { logger } from '../utils/logger';
import { SheetItem, SheetPromo, RestaurantData } from '../types/sheets.types';

/**
 * GoogleSheetsService — Reads menu and promotions from Google Sheets.
 */
class GoogleSheetsService {
    private sheets: sheets_v4.Sheets | null = null;
    private initialized = false;
    private spreadsheetId: string | null = null;

    // Cache to avoid hitting the API on every single message
    private cache: RestaurantData | null = null;
    private cacheExpiryMs = 5 * 60 * 1000; // 5 minutes cache

    constructor() {
        this.init();
    }

    private init() {
        try {
            if (!env.GOOGLE_SHEETS_CREDENTIALS) {
                logger.warn('⚠️ GOOGLE_SHEETS_CREDENTIALS not configured — SheetsService disabled');
                return;
            }

            if (!env.SHEETS_CARDAPIO_ID) {
                logger.warn('⚠️ SHEETS_CARDAPIO_ID not configured — SheetsService disabled');
                return;
            }

            this.spreadsheetId = env.SHEETS_CARDAPIO_ID;

            // Parse coordinates (supports both raw JSON or base64 encoded JSON to avoid escaping issues in env vars)
            let credentialsJson;
            try {
                const decoded = Buffer.from(env.GOOGLE_SHEETS_CREDENTIALS, 'base64').toString('utf8');
                credentialsJson = JSON.parse(decoded.includes('{') ? decoded : env.GOOGLE_SHEETS_CREDENTIALS);
            } catch {
                // Fallback to direct raw JSON parsing
                credentialsJson = JSON.parse(env.GOOGLE_SHEETS_CREDENTIALS);
            }

            const auth = new google.auth.GoogleAuth({
                credentials: {
                    client_email: credentialsJson.client_email,
                    private_key: credentialsJson.private_key,
                },
                scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
            });

            this.sheets = google.sheets({ version: 'v4', auth });
            this.initialized = true;

            logger.info('📊 GoogleSheetsService initialized');
        } catch (error) {
            logger.error({ error: error instanceof Error ? error.message : String(error) }, '❌ Failed to initialize GoogleSheetsService');
            this.initialized = false;
        }
    }

    /**
     * Main method to get the menu data (uses cache if fresh).
     */
    async getRestaurantData(): Promise<RestaurantData> {
        if (!this.initialized || !this.sheets || !this.spreadsheetId) {
            return this.getEmptyData();
        }

        const now = Date.now();
        if (this.cache && now - this.cache.lastUpdate.getTime() < this.cacheExpiryMs) {
            return this.cache;
        }

        try {
            const db = await this.fetchFromSheets();
            this.cache = db;
            return db;
        } catch (error) {
            logger.error({ error: error instanceof Error ? error.message : String(error) }, 'Failed to fetch sheets data');

            // Return stale cache if available, otherwise empty
            return this.cache || this.getEmptyData('Erro temporário ao carregar cardápio.');
        }
    }

    /**
     * Refreshes the cache immediately.
     */
    async forceRefresh(): Promise<RestaurantData> {
        const db = await this.fetchFromSheets();
        this.cache = db;
        return db;
    }

    /**
     * Fetches the raw data and formats it.
     */
    private async fetchFromSheets(): Promise<RestaurantData> {
        if (!this.sheets || !this.spreadsheetId) throw new Error('Not initialized');

        // Fetch both ranges in parallel
        // Assuming standard tab names: "Cardapio" (A:E) and "Promocoes" (A:E)
        // Row 1 is header
        const [cardapioRes, promocoesRes] = await Promise.all([
            this.sheets.spreadsheets.values.get({
                spreadsheetId: this.spreadsheetId,
                range: 'Cardapio!A2:E999',
            }).catch(() => ({ data: { values: null } })),
            this.sheets.spreadsheets.values.get({
                spreadsheetId: this.spreadsheetId,
                range: 'Promocoes!A2:E99',
            }).catch(() => ({ data: { values: null } }))
        ]);

        const items = this.parseItems(cardapioRes.data.values);
        const promos = this.parsePromos(promocoesRes.data.values);

        const formattedMenu = this.formatMenuText(items);
        const formattedPromos = this.formatPromosText(promos);

        logger.info(
            { itemsCount: items.length, promosCount: promos.length },
            '🔄 Menu data refreshed from Google Sheets',
        );

        return {
            items,
            promos,
            formattedMenu,
            formattedPromos,
            lastUpdate: new Date(),
        };
    }

    /**
     * Parses the raw rows into SheetItem objects.
     * Expected columns: Nome | Descricao | Preco | Categoria | Disponivel(Sim/Nao)
     */
    private parseItems(rows: any[][] | null | undefined): SheetItem[] {
        if (!rows || !Array.isArray(rows)) return [];

        return rows
            .filter((row) => row && row.length >= 3 && row[0]?.trim()) // At least name and price
            .map((row) => {
                const isAvailable = row[4] ? row[4].toString().toLowerCase() !== 'não' && row[4].toString().toLowerCase() !== 'nao' : true;

                return {
                    name: String(row[0] || '').trim(),
                    description: String(row[1] || '').trim(),
                    price: String(row[2] || '').trim(),
                    category: String(row[3] || 'Geral').trim(),
                    available: isAvailable,
                };
            })
            .filter(item => item.available); // Exclude unavailable items completely from Gemini's sight
    }

    /**
     * Parses the raw rows into SheetPromo objects.
     * Expected columns: Nome | Descricao | Preco Promocional | Regras | Ativa(Sim/Nao)
     */
    private parsePromos(rows: any[][] | null | undefined): SheetPromo[] {
        if (!rows || !Array.isArray(rows)) return [];

        return rows
            .filter((row) => row.length >= 3 && row[0]?.trim())
            .map((row) => {
                const isActive = row[4] ? row[4].toString().toLowerCase() === 'sim' : true;

                return {
                    name: String(row[0] || '').trim(),
                    description: String(row[1] || '').trim(),
                    price: String(row[2] || '').trim(),
                    rules: String(row[3] || '').trim(),
                    active: isActive,
                };
            })
            .filter(promo => promo.active);
    }

    /**
     * Generates a readable markdown text of the menu for Gemini.
     */
    private formatMenuText(items: SheetItem[]): string {
        if (items.length === 0) return 'O cardápio está vazio no momento.';

        // Group by category
        const byCategory: Record<string, SheetItem[]> = {};
        for (const item of items) {
            if (!byCategory[item.category]) byCategory[item.category] = [];
            byCategory[item.category].push(item);
        }

        let text = '';
        for (const [category, catItems] of Object.entries(byCategory)) {
            text += `\n[CATEGORIA: ${category.toUpperCase()}]\n`;
            for (const item of catItems) {
                text += `- ${item.name} | ${item.price}\n`;
                if (item.description) text += `  (${item.description})\n`;
            }
        }

        return text.trim();
    }

    /**
     * Generates a readable text of the promos for Gemini.
     */
    private formatPromosText(promos: SheetPromo[]): string {
        if (promos.length === 0) return 'Nenhuma promoção ativa hoje.';

        let text = '';
        for (const promo of promos) {
            text += `- 🌟 ${promo.name} | Por apenas: ${promo.price}\n`;
            if (promo.description) text += `  Detalhes: ${promo.description}\n`;
            if (promo.rules) text += `  Regra: ${promo.rules}\n`;
        }

        return text.trim();
    }

    private getEmptyData(msg = 'Aguardando sincronização do cardápio.'): RestaurantData {
        return {
            items: [],
            promos: [],
            lastUpdate: new Date(),
            formattedMenu: msg,
            formattedPromos: 'Sem promoções ativas.',
        };
    }
}

// Singleton
export const sheetsService = new GoogleSheetsService();
export { GoogleSheetsService };
