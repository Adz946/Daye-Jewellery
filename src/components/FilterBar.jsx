import { useState } from 'react';
import FilterGem from './filter/FilterGem';
import FilterBasic from './filter/FilterBasic';
import FilterMaterial from './filter/FilterMaterial';

function getFilters(filterType, filters, updaters) {
    switch (filterType) {
        case "basic":
            return <FilterBasic filters={filters} updaters={updaters} />
        case "material":
            return <FilterMaterial filters={filters} updaters={updaters} />
        case "gem":
            return <FilterGem filters={filters} updaters={updaters} />
        default:
            return <FilterBasic filters={filters} updaters={updaters} />
    }
}

export default function FilterBar({ classes, filters, updaters }) {
    const [filterType, setFilterType] = useState("basic");

    return (
        <div className={`${classes} flex flex-col rounded-sm shadow-inner-custom`}>
            <h2 className='p-1 text-center text-3xl font-title border-b-1 border-light'>Filters</h2>

            <div className='p-4 gap-4 flex flex-row justify-between'>
                <button onClick={() => setFilterType("basic")} className={`w-1/3 px-4 py-2 rounded-sm cursor-pointer animate
                    ${filterType == "basic" ? 'bg-dark text-light' : 'border-2 text-dark'}`}>Basic</button>

                <button onClick={() => setFilterType("material")} className={`w-1/3 p-2 rounded-sm cursor-pointer animate
                    ${filterType == "material" ? 'bg-dark text-light' : 'border-2 text-dark'}`}>Material</button>

                <button onClick={() => setFilterType("gem")} className={`w-1/3 p-2 rounded-sm cursor-pointer animate
                    ${filterType == "gem" ? 'bg-dark text-light' : 'border-2 text-dark'}`}>Gem</button>
            </div>

            {getFilters(filterType, filters, updaters)}
        </div>
    );
}