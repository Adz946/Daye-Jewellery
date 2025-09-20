import { useState, useEffect } from 'react';

export function useMenu() {
    const [menuData, setMenuData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                const response = await fetch('/data/menus.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch menu data');
                }
                const data = await response.json();
                setMenuData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMenuData();
    }, []);

    return { menuData, loading, error };
}