export function Button({text}) {
    return ( 
        <button className="w-1/4 py-5 text-xl text-light bg-dark rounded-sm font-title animate
            hover:bg-black hover:scale-110 hover:drop-shadow-2xl">{text}</button> 
    );
}