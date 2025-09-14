'use client';
import { useState, useEffect } from 'react';
import { Scroller } from "@/components/Scroller";
import { ShopItem } from "@/components/ShopItem";

export function SelectionScroller({ title }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadBestSellers = async () => {
        if (loading) return;      
        setLoading(true);

        try {
            const response = await fetch('/api/best-seller-query', {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await response.json();
            if (data.success) { 
                setItems(data.results); 
            }
        } catch (error) {
            console.error('Failed to load selection list:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadBestSellers(); }, []);

    return (
        <section className="section p-12">
            <Scroller title={title}>
                {loading ? ( <p>Loading selection list...</p> ) : (
                    items.map((item, index) => (
                        <ShopItem key={`${item.JewelleryID}-${index}`} id={item.JewelleryID} desc={item.Desc} 
                            price={item.Price} salePrice={item.SalePrice} type={item.Type} sizes={item.Sizes} />
                    ))
                )}
            </Scroller>
        </section>
    );
}