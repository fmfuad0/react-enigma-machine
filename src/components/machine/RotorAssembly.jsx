import Pane from "../ui/Pane.jsx";
import Field from "../ui/Field.jsx";
import Sel from "../ui/Sel.jsx";
import {ALPHABET, ROTOR_OPTIONS, REFLECTOR_OPTIONS} from "../../constants";
import {REFLECTOR_DB} from '../../engine/enigma.js'

export default function RotorAssembly({config, onRotorChange, onReflectorChange}) {
    return (
        <Pane title="ROTORS">
            <div className="flex flex-col gap-[5px]">
                {[0, 1, 2].map((i) => (
                    <div key={i}
                         className="grid items-end gap-[6px] rounded-sm border border-[var(--bdr2)] bg-[var(--s2)] px-[6px] py-[5px]"
                         style={{gridTemplateColumns: "14px 1fr 1fr 1fr"}}>
                        <span
                            className="pb-[5px] font-['Oswald'] text-[11px] text-center font-semibold leading-none text-[var(--amb)]">{i + 1}</span>
                        <Field label="MODEL"><Sel value={config.rotors[i]} onChange={(v) => onRotorChange(i, "rotor", v)}
                                                options={ROTOR_OPTIONS}/></Field>
                        <Field label="POSITION"><Sel value={config.positions[i]}
                                                onChange={(v) => onRotorChange(i, "position", v)}
                                                options={ALPHABET}/></Field>
                        <Field label="RING"><Sel value={config.ringSettings[i]}
                                                onChange={(v) => onRotorChange(i, "ring", parseInt(v))}
                                                options={Array.from({length: 26}, (_, k) => ({
                                                    v: k + 1,
                                                    l: String(k + 1).padStart(2, "0")
                                                }))}/></Field>
                    </div>
                ))}
            </div>
            <div className="mt-[7px] flex items-center gap-[8px] border-t border-[var(--bdr2)] pt-[7px]">
                <span
                    className="flex-shrink-0 font-['Oswald'] text-[10px] tracking-[2px] text-[var(--amb)]">REFLECTOR</span>
                <div className="relative w-[80px]">
                    <select value={config.reflector} onChange={(e) => onReflectorChange(e.target.value)}
                            className="w-full appearance-none rounded-sm border border-[var(--bdr)] bg-[var(--s3)] py-[3px] pl-[6px] pr-[18px] font-['Share_Tech_Mono'] text-[13px] tracking-[1px] text-[var(--amb)] focus:border-[var(--amb-d)] focus:outline-none">
                        {REFLECTOR_OPTIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                    <span
                        className="pointer-events-none absolute right-[5px] top-1/2 -translate-y-1/ 2 text-[8px] text-[var(--txt-d)]">▾</span>
                </div>
                <span
                    className="font-['Oswald'] text-[9px] tracking-[2px] text-[var(--amb-l)]">{REFLECTOR_DB[config.reflector]}</span>
            </div>
        </Pane>
    );
}
