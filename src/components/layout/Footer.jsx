export default function Footer() {
    return (
        <footer className=" flex items-center justify-center border-t border-[var(--bdr2)] px-[12px]"
                style={{height: "26px"}}>
<span className="font-['Oswald'] text-[8px] tracking-[3px] text-[var(--txt)]">
ENIGMA M3 · WEHRMACHT CIPHER SIMULATOR
</span>
            <span className="flex items-center gap-[10px]">
<span className="font-['Oswald'] text-[8px] tracking-[2px] text-[var(--txt-d)]">
CRAFTED BY
<a href="https://github.com/fmfuad0" target="_blank" rel="noopener noreferrer"
   className="ml-[6px] text-[var(--amb)] transition-colors hover:text-[var(--amb-l)]">
FM FUAD
</a>
</span>
<span className="h-[10px] w-px bg-[var(--bdr2)]"/>
<a href="https://github.com/fmfuad0/react-enigma-machine" target="_blank" rel="noopener noreferrer"
   className="font-['Oswald'] text-[8px] tracking-[2px] text-[var(--txt)] transition-colors hover:text-[var(--amb)]">
GITHUB ↗
</a>
</span>
        </footer>
    );
}