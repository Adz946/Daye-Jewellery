// utils/collectionUtils.js
export async function fetchCollections() {
    try {
        const response = await fetch('/api/collection-query', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        
        if (data.success) {
            return data.results;
        }
        return [];
    } catch (error) {
        console.error('Failed to fetch collections:', error);
        return [];
    }
}

export async function fetchCollectionById(collectionId) {
    try {
        const collections = await fetchCollections();
        
        // Handle type mismatches by trying different comparisons
        const collection = collections.find(c => 
            c.CollectionID == collectionId || // Loose comparison
            String(c.CollectionID) === String(collectionId) // String comparison
        );
        
        return collection || null;
    } catch (error) {
        console.error('Failed to fetch collection by ID:', error);
        return null;
    }
}