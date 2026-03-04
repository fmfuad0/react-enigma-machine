const ROWS = ["QWERTZUIO".split(""), "ASDFGHJK".split(""), "PYXCVBNML".split("")];
export default function Lampboard({litLetter, livePos}) {

    return (
        <div className={''}>
                <div
                    className="flex flex-col items-center gap-[15px] bg-[radial-gradient(ellipse_at_center,#181408_0%,transparent_80%)] pb-[4px]">
                    <span className=" py-5 w-full flex items-center justify-center gap-2 font-[600] font-['Oswald'] text-[15px] tracking-[3px] text-[var(--amb)]">LAMPBOARD</span>
                    {ROWS.map((row, ri) => (
                        <div key={ri} className="flex gap-[9px]">
                            {row.map((l) => (
                                <div key={l}
                                     className={`flex h-[55px] w-[55px] items-center justify-center rounded-full border-[1.5px] transition-all ${litLetter === l ? "border-[var(--amb-l)] bg-[radial-gradient(circle,var(--amb-g),var(--amb-d))] shadow-[0_0_14px_color-mix(in_srgb,var(--amb-g)_80%,transparent),0_0_28px_color-mix(in_srgb,var(--amb)_30%,transparent)]" : "border-[#252010] bg-[radial-gradient(circle,#181408,#0d0c09)]"}`}>
                                    <span
                                        className={`z-10 font-['Oswald'] text-[15px] font-semibold transition-colors ${litLetter === l ? "text-[var(--lamp-lit-fg)]" : "text-[var(--txt-d)]"}`}>{l}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
        </div>
    );
}
