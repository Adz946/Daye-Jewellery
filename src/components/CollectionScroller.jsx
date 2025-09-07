import { useState, useEffect } from 'react';
import { Scroller } from "@/components/Scroller";
import { CollectionItem } from "@/components/CollectionItem";

export default function CollectionScroller({ onCollectionSelect, selectedCollectionId = null }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadCollections = async () => {
        if (loading) return;      
        setLoading(true);

        try {
            const response = await fetch('/api/collection-query', {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await response.json();
            if (data.success) { 
                setItems(data.results); 
            }
        } catch (error) {
            console.error('Failed to load collections:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCollectionSelect = (collection) => {
        if (onCollectionSelect) { onCollectionSelect(collection); }
    };

    useEffect(() => { loadCollections(); }, []);

    return (
        <div className="flex text-center items-center justify-center">
            <Scroller title="Our Collections">
                {loading ? ( <p>Loading collections...</p> ) : (
                    items.map((item, index) => (
                        <CollectionItem key={`${item.CollectionID}-${index}`} item={item} 
                            onSelect={handleCollectionSelect} isSelected={selectedCollectionId === item.CollectionID} />
                    ))
                )}
            </Scroller>
        </div>
    );
}