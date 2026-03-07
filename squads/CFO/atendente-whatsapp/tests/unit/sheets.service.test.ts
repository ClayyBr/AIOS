import { describe, it, expect } from 'vitest';
import { GoogleSheetsService } from '../../src/services/sheets.service';

describe('GoogleSheetsService', () => {
    it('should initialize gracefully when no credentials are provided', async () => {
        // Creating instance without env vars should safely default to empty state
        const service = new GoogleSheetsService();
        const data = await service.getRestaurantData();

        expect(data.items).toEqual([]);
        expect(data.promos).toEqual([]);
        expect(data.formattedMenu).toContain('Aguardando sincronização');
    });

    // To test parsing logic, we use type assertion to access private methods
    describe('parsing logic', () => {
        const service = new GoogleSheetsService();
        const parseItems = (service as any).parseItems.bind(service);
        const parsePromos = (service as any).parsePromos.bind(service);
        const formatMenuText = (service as any).formatMenuText.bind(service);
        const formatPromosText = (service as any).formatPromosText.bind(service);

        it('should parse valid cardápio rows correctly', () => {
            const rows = [
                ['X-Tudo', 'Pão, hamburguer, queijo, presunto', 'R$ 25,00', 'Lanches', 'Sim'],
                ['Coca Lata', '', 'R$ 6,00', 'Bebidas', ''],
            ];

            const items = parseItems(rows);
            expect(items).toHaveLength(2);
            expect(items[0]).toEqual({
                name: 'X-Tudo',
                description: 'Pão, hamburguer, queijo, presunto',
                price: 'R$ 25,00',
                category: 'Lanches',
                available: true,
            });
            // Implicitly available when blank
            expect(items[1].available).toBe(true);
            expect(items[1].description).toBe('');
        });

        it('should filter out unavailable cardápio items', () => {
            const rows = [
                ['Burger', '', 'R$ 20', 'Lanches', 'Sim'],
                ['Pizza', '', 'R$ 50', 'Lanches', 'Não'], // Should be filtered out
                ['HotDog', '', 'R$ 15', 'Lanches', 'Nao'], // Should be filtered out (no accent)
            ];

            const items = parseItems(rows);
            expect(items).toHaveLength(1);
            expect(items[0].name).toBe('Burger');
        });

        it('should handle malformed cardápio rows', () => {
            const rows = [
                ['Só Nome'], // Invalid length
                ['', 'Desc', 'R$10'], // No name
                null, // Edge case
            ];

            const items = parseItems(rows);
            expect(items).toHaveLength(0);
        });

        it('should parse valid promoções rows correctly', () => {
            const rows = [
                ['Combo C1', 'Hamburguer + Fritas', 'R$ 35,00', 'Válido até 18h', 'Sim'],
            ];

            const promos = parsePromos(rows);
            expect(promos).toHaveLength(1);
            expect(promos[0]).toEqual({
                name: 'Combo C1',
                description: 'Hamburguer + Fritas',
                price: 'R$ 35,00',
                rules: 'Válido até 18h',
                active: true,
            });
        });

        it('should format menu into markdown correctly', () => {
            const items = [
                { name: 'X-Tudo', description: 'Completo', price: 'R$ 25', category: 'Lanches', available: true },
                { name: 'Coca Lata', description: '', price: 'R$ 6', category: 'Bebidas', available: true },
            ];

            const markdown = formatMenuText(items);
            expect(markdown).toContain('[CATEGORIA: LANCHES]');
            expect(markdown).toContain('- X-Tudo | R$ 25');
            expect(markdown).toContain('  (Completo)');
            expect(markdown).toContain('[CATEGORIA: BEBIDAS]');
            expect(markdown).toContain('- Coca Lata | R$ 6');
            expect(markdown).not.toContain('  ()'); // empty description should not render parenthesis
        });
    });
});
