'use strict';

const path = require('path');
const { RegistryLoader } = require('../../../.aios-core/core/ids/registry-loader');

const DEFAULT_FINANCIAL_REGISTRY_PATH = path.resolve(__dirname, '../data/financial-registry.yaml');

class FinancialLoader extends RegistryLoader {
  constructor(registryPath) {
    super(registryPath || DEFAULT_FINANCIAL_REGISTRY_PATH);
  }

  /**
   * Override to interpret 'ingredients' and 'recipes' as valid entity types
   */
  _getAllEntities() {
    this._ensureLoaded();

    // Debug logging
    // console.log("Registry keys:", Object.keys(this._registry));

    const cacheKey = '__allFinancialEntities';
    if (this._cache.has(cacheKey)) {
      return this._cache.get(cacheKey);
    }

    const result = [];
    const entities = this._registry.entities || {};

    // Map financial categories to flat entity list
    for (const [category, categoryEntities] of Object.entries(entities)) {
      if (!categoryEntities || typeof categoryEntities !== 'object') {
        console.warn(`[FinancialLoader] Skipping invalid category: ${category}`);
        continue;
      }

      for (const [entityId, entityData] of Object.entries(categoryEntities)) {
        result.push({
          id: entityId,
          category,
          type: category, // In financial context, category (ingredient/recipe) is the type
          ...entityData
        });
      }
    }

    // console.log(`[FinancialLoader] Loaded ${result.length} entities.`);

    this._cache.set(cacheKey, result);
    return result;
  }

  /**
   * Get cost breakdown for a recipe
   * @param {string} recipeId 
   */
  getRecipeCost(recipeId) {
    const recipe = this._findById(recipeId);
    if (!recipe || !recipe.dependencies) return 0;

    let totalCost = recipe.laborCost || 0;

    for (const depString of recipe.dependencies) {
      // Format: "ingredient:id:quantity"
      const [type, id, qty] = depString.split(':');
      if (type !== 'ingredient') continue;

      const ingredient = this._findById(id);
      if (ingredient && ingredient.price) {
        let cost = ingredient.price * parseFloat(qty);

        // Adjust for yield loss if present
        if (ingredient.yield && ingredient.yield > 0) {
          cost = cost / ingredient.yield;
        }

        totalCost += cost;
      }
    }

    return totalCost;
  }
}

module.exports = { FinancialLoader };
