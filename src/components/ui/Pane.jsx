export default function Pane({title, titleRight, children, className = ""}) {
    return (
        <section
            className={`pane relative flex-shrink-0 rounded-sm border border-[var(--bdr2)] bg-[var(--s1)] px-[10px] py-[8px] before:absolute before:left-[10%] before:right-[10%] before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[var(--amb-d)] before:to-transparent before:transition-all ${className}`}>
            {title && <div
                className="pane-title mb-2 flex items-center gap-2 font-[600] font-['Oswald'] text-[11px] tracking-[3px] text-[var(--amb)]">{title}{titleRight && <>{titleRight}</>}</div>}
            {children}
        </section>
    );
}
