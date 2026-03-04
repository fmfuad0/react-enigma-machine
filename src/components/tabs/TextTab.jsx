import {useState} from "react";
import Pane from "../ui/Pane.jsx";
import {enigmaEncryptString} from "../../engine/enigma.js";

export default function TextTab({config}) {
    const [inputText, setInputText] = useState("HELLO");
    const [outputText, setOutputText] = useState("");

    function encrypt() {
        const clean = inputText.replace(/[^A-Za-z]/g, "").toUpperCase();
        if (!clean) return;
        setOutputText(enigmaEncryptString(config.rotors, config.positions, config.ringSettings, config.reflector, config.plugboard, clean));
    }

    function swap() {
        const t = inputText;
        setInputText(outputText || "");
        setOutputText(t);
    }

    function clear() {
        setInputText("");
        setOutputText("");
    }

    return (
        <div className="tab-body flex flex-1 flex-col gap-[8px] overflow-y-auto py-[8px]">
            <Pane title="PLAINTEXT INPUT">
                <textarea
                    className="w-full resize-y rounded-sm border border-[var(--bdr)] bg-[var(--s3)] px-[10px] py-[8px] font-['Share_Tech_Mono'] text-[14px] leading-[1.7] tracking-[2px] text-[var(--amb)] transition-colors focus:border-[var(--amb-d)] focus:outline-none"
                    style={{minHeight: 80}} value={inputText} spellCheck={false}
                    onChange={(e) => setInputText(e.target.value.toUpperCase().replace(/[^A-Z\s]/g, ""))}
                    placeholder="TYPE OR PASTE MESSAGE..."/>
                <div
                    className="mt-[6px] font-['Oswald'] text-[9px] tracking-[2px] text-[var(--txt)]">{inputText.replace(/[^A-Z]/gi, "").length} LETTERS
                    · FROM POSITIONS {config.positions.join("")}</div>
            </Pane>
            <Pane title="CIPHERTEXT OUTPUT">
                <div
                    className="min-h-[48px] break-all rounded-sm border border-[var(--bdr)] border-l-2 border-l-[var(--amb-d)] bg-[var(--s3)] px-[10px] py-[8px] font-['Share_Tech_Mono'] text-[15px] leading-[1.7] tracking-[3px] text-[var(--amb-l)] transition-colors">
                    {outputText ? outputText.match(/.{1,5}/g)?.join(" ") : <span
                        className="font-['Oswald'] text-[10px] tracking-[2px] text-[var(--amb)] opacity-[80%]">PRESS ENCRYPT</span>}
                </div>
                {outputText && <div
                    className="mt-[6px] font-['Oswald'] text-[9px] tracking-[2px] text-[var(--txt)]">{outputText.length} CHARACTERS</div>}
            </Pane>
            <div className="flex flex-wrap gap-[6px]">
                <button onClick={encrypt}
                        className="cursor-pointer rounded-sm border border-[var(--amb)] bg-[var(--amb-d)] px-[13px] py-[6px] font-['Oswald'] text-[10px] tracking-[2px] text-[var(--amb-l)] transition-all hover:brightness-125">ENCRYPT
                </button>
                <button onClick={swap}
                        className="cursor-pointer rounded-sm border border-[var(--bdr2)] bg-[var(--met)] px-[13px] py-[6px] font-['Oswald'] text-[10px] tracking-[2px] text-[var(--txt)] transition-all hover:border-[var(--amb-d)] hover:text-[var(--amb)]">SWAP
                    ↕
                </button>
                <button onClick={clear}
                        className="cursor-pointer rounded-sm border border-[var(--bdr2)] bg-[var(--met)] px-[13px] py-[6px] font-['Oswald'] text-[10px] tracking-[2px] text-[var(--txt)] transition-all hover:border-[var(--amb-d)] hover:text-[var(--amb)]">CLEAR
                </button>
                {outputText && <button onClick={() => navigator.clipboard?.writeText(outputText)}
                                       className="cursor-pointer rounded-sm border border-[var(--bdr2)] bg-[var(--met)] px-[13px] py-[6px] font-['Oswald'] text-[10px] tracking-[2px] text-[var(--txt)] transition-all hover:border-[var(--amb-d)] hover:text-[var(--amb)]">COPY</button>}
            </div>
            <div className="font-['Oswald'] text-[9px] leading-[1.9] tracking-[2px] text-[var(--txt-d)]">Enigma is
                reciprocal — encrypting ciphertext with the same settings returns the original plaintext.
            </div>
        </div>
    );
}
