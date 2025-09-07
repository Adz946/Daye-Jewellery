'use client';
import { useState } from 'react';
import NavbarPrimary from "@/components/nav/NavbarPrimary";

import ShopGrid from "@/components/ShopGrid";
import CollectionGrid from '@/components/CollectionGrid';
import CollectionScroller from "@/components/CollectionScroller";

export default function Shop() {
    const [selectedCollection, setSelectedCollection] = useState(null);
    const handleCollectionSelect = (collection) => { setSelectedCollection(collection); };
    const handleBackToShop = () => { setSelectedCollection(null); };

    return (
        <main className="px-12 mt-30">
            <NavbarPrimary />
            
            <CollectionScroller onCollectionSelect={handleCollectionSelect} 
                selectedCollectionId={selectedCollection?.CollectionID} />

            {selectedCollection ? 
                ( <CollectionGrid collection={selectedCollection} onBack={handleBackToShop} /> ) 
                : ( <ShopGrid /> )}
        </main>
    );
}