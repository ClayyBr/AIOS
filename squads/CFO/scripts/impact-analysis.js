'use strict';

const { FinancialLoader } = require('./financial-loader');

/**
 * Financial Impact Simulator
 * Usage: node impact-analysis.js --entity "ingredient:tomato-italian" --change 0.15
 */

async function main() {
    const args = process.argv.slice(2);
    const entityArg = args.find(a => a.startsWith('--entity'));
    const changeArg = args.find(a => a.startsWith('--change'));

    if (!entityArg || !changeArg) {
        console.error('Usage: node impact-analysis.js --entity "type:id" --change 0.15 (15%)');
        process.exit(1);
    }

    const targetEntityKey = args[args.indexOf(entityArg) + 1];
    const percentChange = parseFloat(args[args.indexOf(changeArg) + 1]);

    console.log(`\n📊 FINANCIAL IMPACT ANALYSIS`);
    console.log(`Target: ${targetEntityKey}`);
    console.log(`Change: ${(percentChange * 100).toFixed(1)}%\n`);

    const loader = new FinancialLoader();
    loader.load();

    const [type, id] = targetEntityKey.split(':');

    // Fix: Need to load entities properly
    const entities = loader._getAllEntities();

    // Find target entity by ID (ignoring type prefix in search if needed)
    let entity = entities.find(e => e.id === id);

    if (!entity) {
        console.error(`Entity not found: "${id}" in total ${entities.length} entities.`);
        console.log("Available IDs:", entities.map(e => e.id).join(", "));
        process.exit(1);
    }

    // Calculate Old Cost vs New Cost
    // In FinancialLoader, 'type' is set to the registry section (recipes, ingredients)
    const impactedRecipes = entities.filter(e => e.type === 'recipes');

    console.log(`Checking ${impactedRecipes.length} recipes for impact...`);

    const report = [];

    for (const recipe of impactedRecipes) {
        const oldCost = loader.getRecipeCost(recipe.id);

        // Simulate change: Temporarily modify price in memory
        const originalPrice = entity.price;
        const newPrice = originalPrice * (1 + percentChange);

        // Direct object modification works because loader references same objects in memory
        entity.price = newPrice;

        const newCost = loader.getRecipeCost(recipe.id);

        // Revert change
        entity.price = originalPrice;

        const delta = newCost - oldCost;

        if (Math.abs(delta) > 0.001) {
            report.push({
                recipe: recipe.id,
                oldCost,
                newCost,
                delta,
                percent: oldCost > 0 ? ((newCost - oldCost) / oldCost) * 100 : 0
            });
        }
    }

    // Print Report to Console
    if (report.length === 0) {
        console.log("\n✅ No recipes impacted by this change.");
    } else {
        console.table(report.map(r => ({
            Recipe: r.recipe,
            'Old Cost': `R$ ${r.oldCost.toFixed(2)}`,
            'New Cost': `R$ ${r.newCost.toFixed(2)}`,
            'Impact': `R$ ${r.delta > 0 ? '+' : ''}${r.delta.toFixed(2)}`,
            'Change': `${r.percent > 0 ? '+' : ''}${r.percent.toFixed(2)}%`
        })));

        // Generate Markdown Report
        const fs = require('fs');
        const path = require('path');

        // Use current entity price (which was reverted to original)
        const currentPrice = entity.price;
        const newPriceDisplay = (currentPrice * (1 + percentChange)).toFixed(2);

        const mdContent = `# Relatório de Impacto Financeiro (Simulação)

**Data:** ${new Date().toLocaleString()}
**Entidade Afetada:** \`${entity.id}\`
**Variação de Preço:** ${(percentChange * 100).toFixed(1)}% (R$ ${currentPrice.toFixed(2)} ➡️ R$ ${newPriceDisplay})

## 📉 Receitas Impactadas

| Receita | Custo Anterior | Novo Custo | Impacto (R$) | Impacto (%) |
|:---|---:|---:|---:|---:|
${report.map(r => `| ${r.recipe} | R$ ${r.oldCost.toFixed(2)} | R$ ${r.newCost.toFixed(2)} | **${r.delta > 0 ? '+' : ''}${r.delta.toFixed(2)}** | ${r.percent.toFixed(2)}% |`).join('\n')}

> 🤖 Relatório gerado automaticamente pelo **AIOS CFO Squad**.
`;

        const outputPath = path.resolve(__dirname, '../data/impact-report.md');
        fs.writeFileSync(outputPath, mdContent);
        console.log(`\n📄 Report generated at: ${outputPath}`);
    }
}

main().catch(console.error);
