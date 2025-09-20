import { createPortal } from 'react-dom';
import { useState, useEffect, useRef, useMemo } from 'react';
import { X, Plus, Minus, ShoppingBag, Check } from 'lucide-react';

import Image from "next/image";
import { useCart } from '@/contexts/CartContext';
import { SelectButton } from './filter/SelectButton';

function getImg(type) {
    switch(type) {
        case 'N': return "NECKLACE";
        case 'B': return 'BRACELET';
        case 'R': return 'RING';
        case 'E': return 'EARRING';
        default: return 'ITEM';
    }
}

export function ItemModal({ isOpen, onClose, item }) {
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);
    const [justAdded, setJustAdded] = useState(false);
    
    const { addToCart } = useCart();
    const modalRef = useRef(null);

    // Parse sizes from pipe-delimited string
    const availableSizes = useMemo(() => 
        item?.sizes ? item.sizes.split('|').filter(s => s.trim()) : [] ,[item?.sizes]);

    const hasSizes = availableSizes.length > 0;
    
    // Set default size when modal opens
    useEffect(() => {
        if (isOpen) {
            if (hasSizes && availableSizes.length > 0) {
                setSelectedSize(availableSizes[0]);
            }

            setQuantity(1);
            setJustAdded(false);
        } else {
            setSelectedSize('');
        }
    }, [isOpen]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) { onClose(); }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, onClose]);

    // Handle click outside
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) { onClose(); }
    };

    const handleAddToCart = async () => {
        if (hasSizes && !selectedSize) {
            alert('Please select a size');
            return;
        }

        setIsAdding(true);
        
        try {
            const currentPrice = isOnSale ? item.salePrice : item.price;
            addToCart(item.id, item.desc, currentPrice, selectedSize || 'N/A', quantity);
            setJustAdded(true);
            
            setTimeout(() => { setJustAdded(false); onClose(); }, 500);
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Error adding item to cart');
        } finally {
            setIsAdding(false);
        }
    };

    const adjustQuantity = (delta) => {
        setQuantity(prev => { return Math.max(1, prev + delta); });
    };

    // Early return check
    if (!isOpen || !item) return null;

    const isOnSale = item.salePrice !== null && item.salePrice !== undefined;
    const currentPrice = isOnSale ? item.salePrice : item.price;

    const modalContent = (
        <div onClick={handleBackdropClick}  className="fixed inset-0 bg-black/50 flex items-center justify-center z-[950]"
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
            <div ref={modalRef} onClick={e => e.stopPropagation()} className="bg-white rounded-lg max-w-md w-full 
                mx-4 max-h-[70vh] flex flex-col items-center">

                {/* Header */}
                <div className="w-full h-14 flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-semibold text-dark">Add to Cart</h2>
                    <button onClick={onClose} className="text-dark hover:text-red animate" disabled={isAdding}> 
                        <X size={24} /> </button>
                </div>

                {/* Content */}
                <div className="w-full flex flex-col px-12 py-4 gap-4 items-center overflow-y-auto">
                    {/* Product Image */}
                    <div className="relative w-full aspect-square bg-light rounded-lg mb-4">
                        <Image src={`/${getImg(item.type)}_PLACEHOLDER.png`} fill className="object-contain" alt={item.desc} />
                    </div>

                    {/* Product Info */}
                    <div className="w-full text-center mb-4">
                        <h3 className="text-lg font-medium text-dark mb-2">{item.desc}</h3>
                        <div className="text-xl">
                            {isOnSale ? (
                                <div className='flex flex-col'>
                                    <span className="text-gray-500 line-through text-sm">${item.price}</span>
                                    <span className="text-dark font-bold ml-2">${item.salePrice}</span>
                                </div>
                            ) : ( <span className="text-dark">${item.price}</span> )}
                        </div>
                    </div>

                    {/* Size Selection */}
                    {hasSizes && (
                        <div className="w-full mb-4">
                            <label className="block text-sm font-medium text-dark mb-2"> Size </label>
                            
                            <div className="grid gap-2 grid-cols-2 sm:grid-cols-3  sm:gap-4">
                                {availableSizes.map(size => (
                                    <SelectButton key={size} onClick={() => setSelectedSize(size)} disabled={isAdding}
                                        isSelected={selectedSize == size}> {size} </SelectButton>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quantity Selection */}
                    <div className="w-full mb-6">
                        <label className="block text-sm font-medium text-dark mb-2"> Quantity </label>

                        <div className="flex items-center justify-center space-x-3">
                            <button onClick={() => adjustQuantity(-1)} disabled={quantity <= 1 || isAdding} className="w-8 h-8 
                                rounded-full border-2 border-dark flex items-center justify-center hover:border-red animate"
                                > <Minus size={14} /> </button>

                            <span className="text-lg font-medium w-8 text-center">{quantity}</span>

                            <button onClick={() => adjustQuantity(1)} disabled={isAdding} className="w-8 h-8 rounded-full 
                                border-2 border-dark flex items-center justify-center hover:border-green animate"
                                > <Plus size={14} /> </button>
                        </div>
                    </div>

                    {/* Total Price */}
                    <div className="text-center mb-6">
                        <div className="text-sm text-gray-600">Total</div>
                        <div className="text-2xl font-bold text-dark"> ${(currentPrice * quantity).toFixed(2)} </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button onClick={handleAddToCart} disabled={isAdding || justAdded}
                        className={`w-full py-3 rounded-md font-medium transition-all duration-300 ${
                            justAdded ? 'bg-green-500 text-white' : 'bg-dark text-white hover:bg-gray-800'
                        } disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2`}
                    >
                        {justAdded ? (
                            <>
                                <Check size={20} />
                                <span>Added to Cart!</span>
                            </>
                        ) : isAdding ? (
                            <span>Adding...</span>
                        ) : (
                            <>
                                <ShoppingBag size={20} />
                                <span>Add to Cart</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}