export default function Field({label, children}) {
    return (
        <div className="flex flex-col gap-[2px]">
            <div className="font-['Oswald'] text-[10px] tracking-[2px] text-[var(--txt-b)] ">{label}</div>
            {children}
        </div>
    );
}
