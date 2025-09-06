import { FilterHead } from '@/components/filter/FilterHead';
import TypeSelector from '@/components/filter/TypeSelector';
import { Coins, DollarSign, SortAsc } from 'lucide-react';

export default function FilterBasic({filters, updaters}) {
    const sortOptions = [
        { value: "", label: "Default" },
        { value: "price_asc", label: "Cheapest First" },
        { value: "price_desc", label: "Cheapest Last" },
        { value: "name_asc", label: "A - Z" },
        { value: "name_desc", label: "Z - A" },
        { value: "sale_first", label: "On Sale First" },
        { value: "in_demand", label: "In Demand" },
        { value: "random", label: "Random" }
    ];

    return (
        <>
            {/* SORT */}
            <div className='p-2 gap-6 flex flex-col'>
                <FilterHead title="Sort" icon={SortAsc} />

                <select value={filters.sort || ""} onChange={(e) => updaters.updateSort(e.target.value)}
                    className="p-2 border-b-2 border-light">
                        {sortOptions.map(option => (
                            <option key={option.value} value={option.value} className='p-1'>{option.label}</option>
                        ))}
                </select>
            </div>

            {/* PRICE */}
            <div className='p-2 gap-6 flex flex-col'>
                <FilterHead title="Price" icon={DollarSign} />

                <div className='p-2 gap-4 flex flex-row text-center justify-between'>
                    <input type='number' placeholder='Min' value={filters.price?.min || ""} className='w-2/5 border-b-2 border-light'
                        onChange={(e) => updaters.updatePrice(parseInt(e.target.value) || 0, filters.price?.max || 5000)} />

                    <p className='w-1/5 text-lg text-dark'>-</p>

                    <input type='number' placeholder='Max' value={filters.price?.max || ""} className='w-2/5 border-b-2 border-light'
                        onChange={(e) => updaters.updatePrice(filters.price?.min || 0, parseInt(e.target.value) || 5000)} />
                </div>
            </div>
            
            {/* TYPE */}
            <div className='p-2 gap-6 flex flex-col'>
                <FilterHead title="Type" icon={Coins} />

                <TypeSelector selectedTypes={filters.types || ["Ring", "Necklace", "Bracelet", "Earring"]}
                    onUpdate={updaters.updateTypes} />
            </div>
        </>
    );
}