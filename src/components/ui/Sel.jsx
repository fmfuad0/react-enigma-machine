export default function Sel({value, onChange, options, className = ""}) {
    return (
        <div className={`relative ${className}`}>
            <select value={value} onChange={(e) => onChange(e.target.value)}
                    className="w-full text-center appearance-none rounded-sm border border-[var(--bdr)] bg-[var(--s3)] py-[3px] pl-[6px] pr-[18px] font-['Share_Tech_Mono'] text-[13px] tracking-[1px] text-[var(--amb)] transition-colors focus:border-[var(--amb-d)] focus:outline-none">
                {options.map((o) => typeof o === "string" ? <option key={o} value={o}>{o}</option> :
                    <option key={o.v} value={o.v}>{o.l}</option>)}
            </select>
            <span
                className="pointer-events-none absolute right-[5px] top-1/2 -translate-y-1/2 text-[8px] text-[var(--amb)]">▾</span>
        </div>
    );
}
