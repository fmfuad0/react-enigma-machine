import {useEffect} from "react";
import Pane from "../ui/Pane.jsx";
import {ALPHABET} from "../../constants/index.js";

const ROWS = ["QWERTZUIO".split(""), "ASDFGHJK".split(""), "PYXCVBNML".split("")];
export default function EnigmaKeyboard({onPress, pressedKey}) {
    useEffect(() => {
        const h = (e) => {
            if (e.repeat) return;
            const active = document.activeElement;
            const tag = active?.tagName?.toLowerCase();
            if (tag === "input" || tag === "textarea") return;
            const k = e.key.toUpperCase();
            if (ALPHABET.includes(k)) {
                e.preventDefault();
                onPress(k);
            }
        };
        window.addEventListener("keydown", h);
        return () => window.removeEventListener("keydown", h);
    }, [onPress]);
    return (
        <div>
            <div
                className="flex flex-col items-center gap-[15px] bg-[radial-gradient(ellipse_at_center,#181408_0%,transparent_80%)] pb-[4px]">
                <span className="w-full font-[600] font-['Oswald'] text-[15px] tracking-[3px] text-[var(--amb)] text-center m-30">KEYBOARD</span>
            </div>
            <div className="flex flex-col items-center gap-[6px] py-[2px]">
                {ROWS.map((row, ri) => (
                    <div key={ri} className="flex gap-[15px] ">
                        {row.map((l) => (
                            <button key={l} onMouseDown={(e) => {
                                e.preventDefault();
                                onPress(l);
                            }}
                                    className={`key relative top-0 h-[45px] w-[50px] cursor-pointer select-none rounded-[3px] border-b-2 border-[var(--riv)] bg-gradient-to-b from-[var(--met2)] to-[var(--met)] font-['Oswald'] text-[12px] font-semibold text-[var(--txt)] transition-colors hover:border-[var(--amb-d)] hover:text-[var(--amb-l)] hover:brightness-125 active:top-px active:border-b active:border-[var(--amb)] active:bg-gradient-to-b active:from-[var(--s2)] active:to-[var(--s3)] active:text-[var(--amb)] active:shadow-[inset_0_0_6px_color-mix(in_srgb,var(--amb)_20%,transparent)] ${pressedKey === l ? "!top-px !border-b !border-[var(--amb)] !bg-gradient-to-b !from-[var(--s2)] !to-[var(--s3)] !text-[var(--amb)] !shadow-[inset_0_0_6px_color-mix(in_srgb,var(--amb)_20%,transparent)]" : ""}`}>
                                {l}
                            </button>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
