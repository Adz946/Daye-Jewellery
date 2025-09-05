class FilterStorage {
    constructor() {
        this.storageKey = 'jewelryFilters';
        this.defaultFilters = {
            sort: "",
            search: "",
            onSale: false,
            price: { min: 0, max: 5000 },
            types: ["Necklace", "Bracelet", "Ring", "Earring"],
            materialQuery: false,
            material: [],
            gemQuery: false,
            gem: []
        };
    }

    // Get current filters from sessionStorage
    getFilters() {
        if (typeof window === 'undefined') return this.defaultFilters;
        
        const stored = sessionStorage.getItem(this.storageKey);
        return stored ? JSON.parse(stored) : this.defaultFilters;
    }

    // Save filters to sessionStorage
    saveFilters(filters) {
        if (typeof window === 'undefined') return;
        
        // Update query flags automatically
        filters.materialQuery = filters.material && filters.material.length > 0;
        filters.gemQuery = filters.gem && filters.gem.length > 0;
        
        sessionStorage.setItem(this.storageKey, JSON.stringify(filters));
    }

    // Update specific filter and save
    updateFilter(key, value) {
        const currentFilters = this.getFilters();
        currentFilters[key] = value;
        this.saveFilters(currentFilters);
        return currentFilters;
    }

    // Reset to defaults
    resetFilters() {
        this.saveFilters({ ...this.defaultFilters });
        return this.defaultFilters;
    }
}

export default FilterStorage;