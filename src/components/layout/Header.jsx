import ThemeSwitcher from "./ThemeSwitcher.jsx";

export default function Header({activeTab, onTabChange, theme, onThemeChange, wasmStatus}) {
    const stClass = {
        ready: "bg-[#44cc44] shadow-[0_0_6px_#44cc44]",
        js: "bg-[var(--amb)] shadow-[0_0_6px_var(--amb)]",
        loading: "bg-[var(--bdr)]"
    };
    const stLabel = {ready: "WASM", js: "JS ENGINE", loading: "LOADING"};
    return (
        <header className="hdr grid flex-shrink-0 items-center gap-[16px] border-b border-[var(--bdr)]"
                style={{height: "var(--hdr)", gridTemplateColumns: "auto 1fr auto"}}>
            <div className="flex items-baseline gap-[10px]">
                <span
                    className="font-['Oswald'] text-[25px] font-bold tracking-[6px] text-[var(--amb)] transition-colors"
                    style={{textShadow: "0 0 16px color-mix(in srgb,var(--amb) 70%,transparent)"}}>ENIGMA MACHINE</span>
                <span
                    className="font-['Oswald'] text-xs font-[400] tracking-[3px] text-[var(--txt-b)] whitespace-nowrap">Wehrmacht M3 · Cipher Machine</span>
            </div>
            <div className="flex justify-center overflow-hidden">
                <ThemeSwitcher current={theme} onChange={onThemeChange}/>
            </div>
            <div className="flex items-center gap-[14px]">
                <div className="flex">
                    {[["machine", "MACHINE"], ["text", "TEXT MODE"], ["config", "CONFIG"]].map(([id, lbl]) => (
                        <button key={id} onClick={() => onTabChange(id)}
                                className={`cursor-pointer border-none border-b-2 bg-transparent px-[14px] py-[5px] font-['Oswald'] text-[10px] tracking-[3px] transition-colors ${activeTab === id ? "border-[var(--amb)] text-[var(--amb)]" : "border-transparent text-[var(--txt-b)] hover:text-[var(--txt)]"}`}>{lbl}</button>
                    ))}
                </div>
                <div
                    className="flex items-center gap-[6px] font-['Oswald'] text-[8px] tracking-[3px] text-[var(--txt-b)] whitespace-nowrap">
                    <div
                        className={`h-[10px] w-[10px] flex-shrink-0 rounded-full transition-all ${stClass[wasmStatus] || ""}`}/>
                    {stLabel[wasmStatus] || ""}
                </div>
            </div>
        </header>
    );
}
