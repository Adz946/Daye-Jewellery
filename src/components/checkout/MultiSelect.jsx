import React from 'react';

export default function MultiSelect({ title, storage = [], onUpdate, children, className = "" }) {
    var optionTotal = 0;

    const options = React.Children.map(children, (child, index) => {
        const text = typeof child.props.children === 'string' 
            ? child.props.children 
            : child.props.children?.toString() || `Option ${index + 1}`;

        if (index > optionTotal) { optionTotal = index; }
        return { id: index, label: text };
    });

    const toggleOption = (optionLabel) => {
        const newValue = storage.includes(optionLabel)
            ? storage.filter(v => v !== optionLabel)
            : [...storage, optionLabel];
        onUpdate(newValue);
    };

    return (
        <section className={`p-4 gap-4 flex flex-col ${className}`}>
            <label className="text-xl font-semibold">{title}</label>

            <div className='gap-4 grid grid-cols-1 lg:grid-cols-2'>
                {options.map((option) => (
                    <label key={option.id} className={`p-4 gap-4 flex items-center cursor-pointer rounded shadow 
                        animate hover:scale-95 ${optionTotal === option.id ? 'col-span-2' : ''}`}>
                        <input type='checkbox' checked={storage.includes(option.label)} onChange={(() => toggleOption(option.label))}
                            className='w-8 aspect-square rounded-2xl border-dark text-dark' />

                        <span className='text-md select-none'>{option.label}</span>
                    </label>
                ))}
            </div>
        </section>
    );
}
