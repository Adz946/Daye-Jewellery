export function Button({
    text,
    onClick = null,
    disabled = null,
    className = "",
}) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`w-full sm:w-1/4 py-4 sm:py-5 text-base md:text-xl text-light bg-dark rounded-sm font-title 
            animate hover:bg-black hover:scale-110 hover:drop-shadow-2xl disabled:opacity-75 ${className}`}
        >
            {text}
        </button>
    );
}
