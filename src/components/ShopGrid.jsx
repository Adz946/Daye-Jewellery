'use client';
import { useState, useEffect, useCallback } from 'react';
import FilterStorage from '../utils/FilterStorage';
import FilterBar from './FilterBar';
import { ShopItem } from './ShopItem';
import { Toggle } from './filter/Toggle';
import { Search } from 'lucide-react';
import { Button } from './Button';

export default function ShopGrid() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);    
    const [filters, setFilters] = useState(null);
    
    const filterStorage = new FilterStorage();
    const itemsPerPage = 20;

    // Load initial filters
    useEffect(() => {
        const initialFilters = filterStorage.getFilters();
        setFilters(initialFilters);
    }, []);

    // Load items from API
    const loadItems = useCallback(async (currentPage = 0, clearGrid = false) => {
        if (loading || !filters) return;      
        setLoading(true);
        
        try {
            const response = await fetch('/api/test-query', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    filters: filters,
                    page: currentPage,
                    limit: itemsPerPage
                })
            });

            const data = await response.json();

            if (data.success) {
                if (clearGrid) { setItems(data.results); } 
                else { setItems(prev => [...prev, ...data.results]); }
                setHasMore(data.hasMore);
                setPage(currentPage);
            }
        } catch (error) {
            console.error('Failed to load items:', error);
        } finally {
            setLoading(false);
        }
    }, [loading, filters, itemsPerPage]);

    
    // Update filters and reload (single function for all filter updates)
    const updateFilters = useCallback((newFilters) => {
        filterStorage.saveFilters(newFilters);
        setFilters(newFilters);
        
        // Clear grid and reload
        setItems([]);
        setPage(0);
        setHasMore(true);
    }, []);

    // Individual filter updater functions to pass to FilterBar
    const filterUpdaters = {
        updateSearch: (searchTerm) => {
            const newFilters = { ...filters, search: searchTerm };
            updateFilters(newFilters);
        },
        
        updateSort: (sortValue) => {
            const newFilters = { ...filters, sort: sortValue };
            updateFilters(newFilters);
        },
        
        updatePrice: (min, max) => {
            const newFilters = { ...filters, price: { min, max } };
            updateFilters(newFilters);
        },
        
        updateTypes: (types) => {
            const newFilters = { ...filters, types };
            updateFilters(newFilters);
        },
        
        updateOnSale: (onSale) => {
            const newFilters = { ...filters, onSale };
            updateFilters(newFilters);
        },
        
        updateMaterial: (material) => {
            const newFilters = { ...filters, material, materialQuery: material.length > 0 };
            updateFilters(newFilters);
        },
        
        updateGem: (gem) => {
            const newFilters = { ...filters, gem, gemQuery: gem.length > 0 };
            updateFilters(newFilters);
        }
    };

    // Load items when filters change
    useEffect(() => {
        if (filters) {
            loadItems(0, true);
        }
    }, [filters]);

    // Load more items
    const loadMore = useCallback(() => {
        if (!loading && hasMore) {
            loadItems(page + 1, false);
        }
    }, [loading, hasMore, page, loadItems]);

    if (!filters) return <div>Loading...</div>;

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Filter Head */}
            <div className="w-full mb-4 py-4 gap-6 flex flex-row items-center justify-center">              
                <div className='w-3/4 p-2 gap-2 flex flex-row items-center border-2 border-dark/50 rounded-lg'>
                    <input type="text" placeholder="Search..." defaultValue={filters?.search || ''}
                        onChange={(e) => filterUpdaters.updateSearch(e.target.value)} className="w-full focus:outline-none" />

                    <Search className='pointer-events-none w-6 h-6' />
                </div>
                
                <Toggle checked={filters?.onSale || false} label="Sale Items Only" id="sale-toggle" 
                    onChange={filterUpdaters.updateOnSale} />
            </div>

            {/* Items Grid */}
            <div className='w-full flex flex-row'>
                <FilterBar classes="w-1/4 p-4 gap-8" filters={filters} updaters={filterUpdaters} />

                <div className='w-3/4 p-4'>
                    <div className="w-full gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {items.map((item, index) => (
                            <ShopItem key={`${item.JewelleryID}-${index}`} desc={item.Desc} price={item.Price}
                                salePrice={item.SalePrice} type={item.Type} />
                        ))}
                    </div>

                    {/* Loading State */}
                    {loading && ( <p className="text-center py-8 text-dark">Loading...</p> )}

                    {/* Load More Button */}
                    {!loading && hasMore && items.length > 0 && ( 
                        <div className='text-center py-8'> <Button text="Load More" onClick={loadMore} /> </div>
                    )}

                    {/* No More Items */}
                    {!loading && !hasMore && items.length > 0 && ( 
                        <p className="text-center py-8 text-dark">All Items Loaded</p> 
                    )}

                    {/* No Items Found */}
                    {!loading && items.length === 0 && (
                        <p className="text-center py-8 text-dark">No Items Found</p>
                    )}
                </div>
            </div>
            
        </div>
    );
}