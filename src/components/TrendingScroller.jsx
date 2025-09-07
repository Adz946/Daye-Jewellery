'use client';
import { useState, useEffect } from 'react';
import { Scroller } from "@/components/Scroller";
import { ShopItem } from "@/components/ShopItem";

export default function TrendingNow() {
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
            console.error('Failed to load best sellers:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadBestSellers(); }, []);

    return (
        <section className="section p-12">
            <Scroller title="Trending Now">
                {loading ? ( <p>Loading trending items...</p> ) : (
                    items.map((item, index) => (
                        <ShopItem key={`${item.JewelleryID}-${index}`} desc={item.Desc} price={item.Price}
                            salePrice={item.SalePrice} type={item.Type} />
                    ))
                )}
            </Scroller>
        </section>
    );
}