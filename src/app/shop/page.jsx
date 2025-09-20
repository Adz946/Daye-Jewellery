'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchCollectionById } from '@/utils/CollectionsUtil';

import ShopGrid from "@/components/ShopGrid";
import CollectionGrid from '@/components/CollectionGrid';
import CollectionScroller from "@/components/CollectionScroller";

function ShopContent() {
    const [selectedCollection, setSelectedCollection] = useState(null);
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();

    // Handle collection selection from URL parameters
    useEffect(() => {
        const collectionId = searchParams.get('collection');
        
        if (collectionId) {
            setLoading(true);
            fetchCollectionById(collectionId)
                .then(collection => {
                    if (collection) {
                        setSelectedCollection(collection);
                    }
                })
                .catch(error => {
                    console.error('Failed to load collection:', error);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setSelectedCollection(null);
        }
    }, [searchParams]);

    const handleCollectionSelect = (collection) => { 
        setSelectedCollection(collection); 
        // Update URL
        const url = `/shop?collection=${collection.CollectionID}`;
        window.history.pushState(null, '', url);
    };

    const handleBackToShop = () => { 
        setSelectedCollection(null);
        window.history.pushState(null, '', '/shop');
    };

    if (loading) {
        return (
            <main>
                <section className='px-12'>
                    <CollectionScroller onCollectionSelect={handleCollectionSelect} />
                    <div className="text-center py-8">Loading collection...</div>
                </section>
            </main>
        );
    }

    return (
        <main>
            <section className='px-12'>
                <CollectionScroller 
                    onCollectionSelect={handleCollectionSelect} 
                    selectedCollectionId={selectedCollection?.CollectionID} 
                />

                {selectedCollection ? 
                    ( <CollectionGrid collection={selectedCollection} onBack={handleBackToShop} /> ) 
                    : ( <ShopGrid /> )}
            </section>
        </main>
    );
}

export default function Shop() {
    return (
        <Suspense fallback={
            <main>
                <section className='px-12'>
                    <div className="text-center py-8">Loading shop...</div>
                </section>
            </main>
        }>
            <ShopContent />
        </Suspense>
    );
}