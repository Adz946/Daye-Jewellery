'use client';
import { useState, useEffect } from 'react';
import { ArrowLeft, Heart, ShoppingBag } from 'lucide-react';
import { ShopItem } from './ShopItem';
import { Button } from './Button';

export default function CollectionGrid({ collection, onBack }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadCollectionItems = async () => {
        if (!collection?.CollectionID) return;
        setLoading(true);
        
        try {
            const response = await fetch('/api/collection-items-query', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ collectionID: collection.CollectionID })
            });

            const data = await response.json();
            if (data.success) { setItems(data.results); }
        } catch (error) {
            console.error('Failed to load collection items:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadCollectionItems(); }, [collection]);

    const handleGetAll = () => {
        // Add all items to cart logic here
        console.log('Add all items to cart');
    };

    const handleFavoriteAll = () => {
        // Add all items to favorites logic here  
        console.log('Add all items to favorites');
    };

    if (!collection) return null;

    return (
        <div className="w-full h-dvh p-8">
            {/* Breadcrumbs & Back Button */}
            <div className="w-full mb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="flex items-center gap-2 text-dark hover:text-dark/70">
                        <ArrowLeft size={20} />
                        <span>Back to Shop</span>
                    </button>
                    <div className="text-dark/60">
                        Collections / <span className="text-dark font-semibold">{collection.Name}</span>
                    </div>
                </div>

                {/* Collection Actions */}
                <div className="flex items-center gap-4">
                    <button onClick={handleGetAll} className="flex items-center gap-2 p-2 border-2 border-dark rounded-lg 
                        animate hover:bg-dark hover:text-light">
                        <ShoppingBag size={20} />
                        <span>Bag All</span>
                    </button>

                    <button onClick={handleFavoriteAll} className="flex items-center gap-2 p-2 border-2 border-dark rounded-lg 
                        animate hover:bg-dark hover:text-light">
                        <Heart size={20} />
                        <span>Favorite All</span>
                    </button>
                </div>
            </div>

            {/* Collection Info */}
            <div className="w-full pl-4 py-4 bg-white border-b-2 border-dark/50">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">{collection.Name}</h1>
                        <p className="pl-2 text-sm text-dark/70">{collection.Type} | {collection.ItemCount} items</p>
                        
                        {collection.CollectionPrice && (
                            <p className="pl-2 pt-2 font-semibold text-dark">Collection Price: ${collection.CollectionPrice}</p>
                        )}

                        {collection.DiscountType && (
                            <p className="pl-2 text-sm text-dark">
                                {collection.DiscountType === 'PERCENTAGE' && `${collection.DiscountAmount}% off individual items`}
                                {collection.DiscountType === 'GET-FREE' && `Buy items, get ${collection.DiscountAmount} free`}
                                {collection.DiscountType === 'GET-HALF' && `Buy items, get ${collection.DiscountAmount} half off`}
                                {['GET-1-QUART', 'GET-3-QUART'].includes(collection.DiscountType) && 'Special bulk discount'}
                                {collection.DiscountType === 'REPLACE' && `Items priced at $${collection.DiscountAmount} each`}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Items Grid */}
            <div className="w-full p-8 overflow-y-auto">
                {loading ? ( <p className="text-center py-8 text-dark">Loading collection items...</p> ) : (
                    <div className="w-full gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {items.map((item, index) => (
                            <ShopItem key={`${item.JewelleryID}-${index}`} desc={item.Desc} price={item.Price}
                                salePrice={item.CollectionPrice} type={item.Type} />
                        ))}
                    </div>
                )}

                {/* No Items Found */}
                {!loading && items.length === 0 && (
                    <p className="text-center py-8 text-dark">No items found in this collection</p>
                )}
            </div>
        </div>
    );
}