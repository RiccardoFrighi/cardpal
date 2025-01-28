export const extractCardsFilterOptions = (cards) => {
    const rarities = new Set();
    const supertypes = new Set();
    const subtypes = new Set();
    const types = new Set();

    cards.forEach(card => {
        if (card.rarity) {
            rarities.add(card.rarity);
        }
        if (card.supertype) {
            supertypes.add(card.supertype);
        }
        if (card.subtypes) {
            card.subtypes.forEach(subtype => subtypes.add(subtype));
        }
        if (card.types) {
            card.types.forEach(type => types.add(type));
        }
    });

    return {
        rarities: Array.from(rarities),
        supertypes: Array.from(supertypes),
        subtypes: Array.from(subtypes),
        types: Array.from(types)
    };
};

export const countActiveFilters = (filters) => {
    return Object.values(filters).reduce((count, filterArray) => {
        if (Array.isArray(filterArray) && filterArray.length > 0) {
            count += 1;
        }
        return count;
    }, 0);
}