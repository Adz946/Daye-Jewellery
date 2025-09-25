'use client';
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';

import { Scroller } from "@/components/Scroller";
import { ShopItem } from "@/components/ShopItem";
import { CollectionItem } from '../CollectionItem';
import { useLoading, useToasts } from '@/contexts/UIProvider';

function addShopItem(key, item) {
    return (
        <ShopItem key={key} id={item.JewelleryID} desc={item.Desc} price={item.Price} 
            salePrice={item.SalePrice} type={item.Type} sizes={item.Sizes} />
    );
}

function addCollectionItem(key, item, onSelect) {
    return ( <CollectionItem key={key} item={item} onSelect={onSelect} /> );
}

export function SelectionScroller({ title, apiEndpoint, type = "shop" }) {
    const router = useRouter();
    const navToShop = (id) => { router.push(`/shop?collection=${id}`); };

    const [items, setItems] = useState([]);

    const { addToast } = useToasts();
    const { loading, setLoading } = useLoading();

    const loadScrollItems = async () => {
        if (loading.scrollItems) return;      
        setLoading('scrollItems', true);

        try {
            const response = await fetch(`/api/${apiEndpoint}-query`, {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await response.json();
            if (data.success) { 
                setItems(data.results); 
            }
        } 
        catch (error) { addToast({ message: 'Failed to load best sellers', type: 'error' }); } 
        finally { setLoading('scrollItems', false); }
    };

    useEffect(() => { loadScrollItems(); }, []);

    return (
        <section className="section p-12">
            <Scroller title={title}>
                {loading.scrollItems ? ( 
                    <div className="flex gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="w-64 h-80 bg-gray-200 animate-pulse rounded" />
                        ))}
                    </div> 
                ) : (
                    items.map((item, index) => (
                        type === "shop" ? addShopItem(`${item.JewelleryID}-${index}`, item) 
                            : addCollectionItem(`${item.CollectionID}-${index}`, item, (() => navToShop(item.CollectionID)))
                    ))
                )}
            </Scroller>
        </section>
    );
}