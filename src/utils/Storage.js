// /utils/storage.js - Reusable storage operations
export const createStorageManager = (key, storageType = 'localStorage') => {
    const storage = storageType === 'localStorage' ? localStorage : sessionStorage;
    
    return {
        get: () => {
            try {
                const item = storage.getItem(key);
                return item ? JSON.parse(item) : [];
            } catch { return []; }
        },
        
        set: (() => {
            let timeoutId = null;
            return (data) => {
                if (timeoutId) clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    storage.setItem(key, JSON.stringify(data));
                }, 300); // Shared 300ms debounce
            };
        })(),
        
        clear: () => storage.removeItem(key)
    };
};