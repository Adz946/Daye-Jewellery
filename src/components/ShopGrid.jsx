import { useState, useEffect, useCallback } from 'react';
import FilterStorage from '../utils/FilterStorage';
import FilterBar from './FilterBar';
import { ShopItem } from './ShopItem';
import { Toggle } from './filter/Toggle';
import { Search, Filter, X } from 'lucide-react';
import { Button } from './Button';

export default function ShopGrid() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);    
    const [filters, setFilters] = useState(null);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    
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
            const response = await fetch('/api/item-query', {
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
        if (!loading && hasMore) { loadItems(page + 1, false); }
    }, [loading, hasMore, page, loadItems]);

    if (!filters) return <div>Loading...</div>;

    return (
        <div className="w-full h-dvh p-4">
            <div className="xl:hidden fixed bottom-6 right-6 z-[500]">
                <button onClick={() => setIsMobileFilterOpen(true)} className="bg-dark text-light p-4 rounded-full 
                    shadow-lg"> <Filter size={24} /> </button>
            </div>

            {isMobileFilterOpen && (
                <div className='xl:hidden fixed inset-0 z-[1000] h-full w-full bg-white flex flex-col justify-between'>
                    <div className='w-full p-4 border-b-1 border-dark/70 flex justify-end'>
                        <button onClick={() => setIsMobileFilterOpen(false)}> <X size={28} /> </button>
                    </div>

                    <FilterBar classes="w-full flex flex-col" filters={filters} updaters={filterUpdaters} />

                    <div className='w-full p-4 border-t-1 border-dark/70'>
                        <Button text="Apply Filters" onClick={() => setIsMobileFilterOpen(false)} classes="w-full"/>
                    </div>
                </div>
            )}

            <div className='w-full h-1/8 mb-4 gap-6 flex flex-col sm:flex-row items-center justify-center'>
                <div className='w-full sm:w-3/4 p-2 gap-2 flex flex-row items-center border-2 border-dark/40 rounded-lg'>
                    <input type="text" placeholder="Search..." defaultValue={filters?.search || ''}
                        onChange={(e) => filterUpdaters.updateSearch(e.target.value)} 
                        className="w-full focus:outline-none" />
                    <Search className='pointer-events-none w-6 h-6' />
                </div>

                <Toggle checked={filters?.onSale || false} label="Sale Items Only" id="sale-toggle" onChange={filterUpdaters.updateOnSale} />
            </div>

            {/* Shop Body */}
            <div className='w-full h-7/8 lg:flex lg:flex-row'>
                <FilterBar classes="hidden w-1/4 xl:flex flex-col rounded-sm shadow-inner-custom" filters={filters} updaters={filterUpdaters} />

                <div className='xl:w-3/4 lg:p-8 overflow-y-auto'>
                    <div className="w-full gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {items.map((item, index) => (
                            <ShopItem key={`${item.JewelleryID}-${index}`} id={item.JewelleryID} desc={item.Desc} 
                                price={item.Price} salePrice={item.SalePrice} type={item.Type} sizes={item.Sizes} />
                        ))}
                    </div>

                    {loading && ( <p className="text-center py-8 text-dark">Loading...</p> )}

                    {!loading && hasMore && items.length > 0 && ( 
                        <div className='text-center py-8'> <Button wd="lg:w-1/3" text="Load More" onClick={loadMore} /> </div>
                    )}

                    {!loading && !hasMore && items.length > 0 && ( 
                        <p className="text-center py-8 text-dark">All Items Loaded</p> 
                    )}

                    {!loading && items.length === 0 && (
                        <p className="text-center py-8 text-dark">No Items Found</p>
                    )}
                </div>
            </div>
        </div>
    );
}