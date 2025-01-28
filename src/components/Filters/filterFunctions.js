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

export const filterCards = (cards, activeFilters) => {

    return cards.filter(card => {
        // Check rarity filter
        const matchesRarity = activeFilters.rarities.length === 0 ||
            (card.rarity && activeFilters.rarities.includes(card.rarity));

        // Check supertype filter
        const matchesSupertype = activeFilters.supertypes.length === 0 ||
            (card.supertype && activeFilters.supertypes.includes(card.supertype));

        // Check subtype filter
        const matchesSubtype = activeFilters.subtypes.length === 0 ||
            (card.subtypes && card.subtypes.some(subtype => activeFilters.subtypes.includes(subtype)));

        // Check type filter
        const matchesType = activeFilters.types.length === 0 ||
            (card.types && card.types.some(type => activeFilters.types.includes(type)));

        return matchesRarity && matchesSupertype && matchesSubtype && matchesType;
    })

}

export const countActiveFilters = (filters) => {
    return Object.values(filters).reduce((count, filterArray) => {
        if (Array.isArray(filterArray) && filterArray.length > 0) {
            count += 1;
        }
        return count;
    }, 0);
}