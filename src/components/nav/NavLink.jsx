import Link from "next/link";

export function NavLink({ link, classes = "", onClick = null, ref = null, children }) {
    return (
        <Link href={link} ref={ref} onClick={onClick} className={`${classes} font-title tracking-wide animate hover:scale-95`}>
            {children}
        </Link>
    );
}