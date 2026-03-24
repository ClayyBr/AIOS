import { RestaurantData } from '../types/sheets.types';
/**
 * GoogleSheetsService — Reads menu and promotions from Google Sheets.
 */
declare class GoogleSheetsService {
    private sheets;
    private initialized;
    private spreadsheetId;
    private cache;
    private cacheExpiryMs;
    constructor();
    private init;
    /**
     * Main method to get the menu data (uses cache if fresh).
     */
    getRestaurantData(): Promise<RestaurantData>;
    /**
     * Refreshes the cache immediately.
     */
    forceRefresh(): Promise<RestaurantData>;
    /**
     * Fetches the raw data and formats it.
     */
    private fetchFromSheets;
    /**
     * Parses the raw rows into SheetItem objects.
     * Expected columns: Nome | Descricao | Preco | Categoria | Disponivel(Sim/Nao)
     */
    private parseItems;
    /**
     * Parses the raw rows into SheetPromo objects.
     * Expected columns: Nome | Descricao | Preco Promocional | Regras | Ativa(Sim/Nao)
     */
    private parsePromos;
    /**
     * Generates a readable markdown text of the menu for Gemini.
     */
    private formatMenuText;
    /**
     * Generates a readable text of the promos for Gemini.
     */
    private formatPromosText;
    private getEmptyData;
}
export declare const sheetsService: GoogleSheetsService;
export { GoogleSheetsService };
//# sourceMappingURL=sheets.service.d.ts.map