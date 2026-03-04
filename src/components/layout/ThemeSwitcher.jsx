import {THEMES, THEME_KEYS} from "../../constants/index.js";

export default function ThemeSwitcher({current, onChange}) {
    return (
        <div className="flex items-center gap-[15px]">
            {THEME_KEYS.map((k) => {
                const t = THEMES[k];
                const active = current === k;
                return (
                    <button key={k} onClick={() => onChange(k)} title={t.label}
                            style={{"--swatch": t.amb, "--swatch-d": t["amb-d"]}}
                            className={`flex cursor-pointer flex-col items-center gap-[3px] rounded-sm border px-[6px] py-[3px] transition-all ${active ? "border-[var(--swatch)] bg-[color-mix(in_srgb,var(--swatch)_12%,transparent)]" : "border-[var(--bdr2)] bg-transparent hover:border-[var(--swatch)] hover:bg-[color-mix(in_srgb,var(--swatch)_8%,transparent)]"}`}>
                        <span className="block h-[8px] w-[20px] rounded-[2px]"
                              style={{background: `linear-gradient(90deg,${t["amb-d"]},${t.amb})`}}/>
                        <span
                            className={`font-['Oswald'] text-[7px] tracking-[1px] whitespace-nowrap ${active ? "text-[var(--swatch)]" : "text-[var(--txt-b)]"}`}>{t.label}</span>
                    </button>
                );
            })}
        </div>
    );
}
