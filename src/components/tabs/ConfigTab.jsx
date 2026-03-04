import {useState} from "react";
import Pane from "../ui/Pane.jsx";
import ConfigModal from "../modals/ConfigModal.jsx";
import {STORAGE_KEY, PRESETS, DEFAULT_CONFIG} from "../../constants/index.js";

export default function ConfigTab({config, onApplyPreset}) {
    const [savedCfgs, setSavedCfgs] = useState(() => {
        try {
            const r = localStorage.getItem(STORAGE_KEY);
            return r ? JSON.parse(r) : [];
        } catch {
            return [];
        }
    });
    const [showModal, setShowModal] = useState(false);
    const [saveName, setSaveName] = useState("");

    function saveCfgs(cfgs) {
        setSavedCfgs(cfgs);
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cfgs));
        } catch {
        }
    }

    function handleSave() {
        const name = saveName.trim() || `Config ${savedCfgs.length + 1}`;
        saveCfgs([...savedCfgs, {...config, name, savedAt: new Date().toLocaleString()}]);
        setSaveName("");
    }

    function handleLoad(cfg) {
        const {name, savedAt, ...rest} = cfg;
        onApplyPreset(rest);
        setShowModal(false);
    }

    function handleExport() {
        const blob = new Blob([JSON.stringify(config, null, 2)], {type: "application/json"});
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "enigma-config.json";
        a.click();
        URL.revokeObjectURL(url);
    }

    function handleImport(e) {
        console.log('running')
        const f = e.target.files[0];
        // const data = JSON.parse(f);
        console.log(typeof f)
        if (!f) console.log('no files');
        const r = new FileReader();
        r.onload = (ev) => {
            try {
                const p = JSON.parse(ev.target.result);
                if (p.rotors) {
                    const {text, name, savedAt, ...rest} = p;
                    onApplyPreset(rest);
                }
            } catch {
                alert("Invalid JSON config");
            }
        };
        r.readAsText(f);
        e.target.value = "";
    }

    // const validateEnigmaConfig = (rawConfig) => {
    //
    //     const VALID_ROTORS = ["I","II","III","IV","V"];
    //     const VALID_REFLECTORS = ["B","C"];
    //
    //     if (!rawConfig || rawConfig.trim().length === 0) {
    //         return { valid:false, error:"Empty config" };
    //     }
    //
    //     let config;
    //
    //     try {
    //         config = JSON.parse(rawConfig);
    //     } catch {
    //         return { valid:false, error:"Invalid JSON format" };
    //     }
    //
    //     const { rotorOrder, positions, rings, reflector, plugPairs } = config;
    //
    //     /* ---------- ROTORS ---------- */
    //     if (!Array.isArray(rotorOrder) || rotorOrder.length !== 3)
    //         return { valid:false, error:"Exactly 3 rotors required" };
    //
    //     const rotorSet = new Set();
    //
    //     for (const r of rotorOrder) {
    //         if (!VALID_ROTORS.includes(r))
    //             return { valid:false, error:`Invalid rotor ${r}`};
    //
    //         if (rotorSet.has(r))
    //             return { valid:false, error:"Duplicate rotor"};
    //
    //         rotorSet.add(r);
    //     }
    //
    //     /* ---------- RANGE CHECK ---------- */
    //     const checkRange = (arr,name)=>{
    //         if(!Array.isArray(arr) || arr.length!==3)
    //             return `${name} must contain 3 values`;
    //
    //         for(const v of arr){
    //             if(!Number.isInteger(v) || v<1 || v>26)
    //                 return `${name} must be 1–26`;
    //         }
    //         return null;
    //     };
    //
    //     const err =
    //         checkRange(positions,"positions") ||
    //         checkRange(rings,"rings");
    //
    //     if(err) return {valid:false,error:err};
    //
    //     /* ---------- REFLECTOR ---------- */
    //     if(!VALID_REFLECTORS.includes(reflector))
    //         return {valid:false,error:"Reflector must be B or C"};
    //
    //     /* ---------- PLUGBOARD ---------- */
    //     if(!Array.isArray(plugPairs))
    //         return {valid:false,error:"plugPairs must be array"};
    //
    //     const used = new Set();
    //
    //     for(const pair of plugPairs){
    //
    //         if(typeof pair!=="string" || pair.length!==2)
    //             return {valid:false,error:`Invalid pair ${pair}`};
    //
    //         const [a,b] = pair.toUpperCase();
    //
    //         if(a===b)
    //             return {valid:false,error:`Self pair ${pair}`};
    //
    //         if(!/[A-Z]/.test(a) || !/[A-Z]/.test(b))
    //             return {valid:false,error:`Invalid letters ${pair}`};
    //
    //         if(used.has(a)||used.has(b))
    //             return {valid:false,error:`Letter reused ${pair}`};
    //
    //         used.add(a);
    //         used.add(b);
    //     }
    //
    //     return { valid:true, config };
    // };


    const btn = "cursor-pointer rounded-sm border border-[var(--bdr2)] bg-[var(--met)] px-[13px] py-[6px] font-['Oswald'] text-[10px] tracking-[2px] text-[var(--txt)] transition-all hover:border-[var(--amb-d)] hover:text-[var(--amb)]";
    const btnPrimary = "cursor-pointer rounded-sm border border-[var(--amb)] bg-[var(--amb-d)] px-[13px] py-[6px] font-['Oswald'] text-[10px] tracking-[2px] text-[var(--amb-l)] transition-all hover:brightness-125";
    return (
        <div className="tab-body flex flex-1 flex-col gap-[8px] overflow-y-auto py-[8px]">
            <Pane title="SAVE / LOAD">
                <div className="flex gap-[6px] items-center">
                    <input
                        className="flex-1 rounded-sm border border-[var(--bdr)] bg-[var(--s3)] px-[10px] py-[6px] font-['Share_Tech_Mono'] text-[12px] tracking-[1px] text-[var(--amb)] focus:border-[var(--amb-d)] focus:outline-none"
                        placeholder="Configuration name..." value={saveName}
                        onChange={(e) => setSaveName(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSave()}/>
                    <button onClick={handleSave} className={btnPrimary}>SAVE</button>
                    <button onClick={() => setShowModal(true)} className={btn}>LOAD ({savedCfgs.length})</button>
                </div>
            </Pane>
            <Pane title="IMPORT / EXPORT">
                <div className="flex flex-wrap gap-[6px]">
                    <button onClick={handleExport} className={btnPrimary}>EXPORT JSON</button>
                    <div className="relative inline-block overflow-hidden">
                        <button className={btn}>IMPORT JSON</button>
                        <input type="file" accept=".json" onChange={handleImport}
                               className="cursor-pointer border border"/>
                    </div>
                    <button onClick={() => onApplyPreset(DEFAULT_CONFIG)}
                            className="cursor-pointer rounded-sm border border-[#3a1810] px-[13px] py-[6px] font-['Oswald'] text-[10px] tracking-[2px] text-[#906050] transition-all hover:border-red-500 hover:text-red-400">RESET
                        DEFAULT
                    </button>
                </div>
            </Pane>
            <Pane title="CURRENT CONFIG">
<pre
    className="overflow-x-auto rounded-sm border border-[var(--bdr)] bg-[var(--bg)] p-[10px] font-['Share_Tech_Mono'] text-[11px] leading-[1.8]">
{`{\n  `}<span className="text-[#7090a8]">"rotors"</span>{`:      [`}{config.rotors.map((r, i) => <span key={i}><span
    className="text-[#80aa60]">"{r}"</span>{i < 2 ? ", " : ""}</span>)}{`],\n  `}<span
    className="text-[#7090a8]">"ringSettings"</span>{`: [`}{config.ringSettings.map((r, i) => <span key={i}><span
    className="text-[#c08840]">{r}</span>{i < 2 ? ", " : ""}</span>)}{`],\n  `}<span
    className="text-[#7090a8]">"positions"</span>{`:    [`}{config.positions.map((p, i) => <span key={i}><span
    className="text-[#80aa60]">"{p}"</span>{i < 2 ? ", " : ""}</span>)}{`],\n  `}<span
    className="text-[#7090a8]">"reflector"</span>{`:    `}<span
    className="text-[#80aa60]">"{config.reflector}"</span>{`,\n  `}<span
    className="text-[#7090a8]">"plugboard"</span>{`:    [`}{config.plugboard.map((p, i) => <span key={i}><span
    className="text-[#80aa60]">"{p}"</span>{i < config.plugboard.length - 1 ? ", " : ""}</span>)}{`]\n}`}
</pre>
            </Pane>
            <Pane title="QUICK PRESETS">
                <div className="flex flex-wrap gap-[6px]">
                    {PRESETS.map(({label, cfg}) => (
                        <button key={label} onClick={() => onApplyPreset(cfg)} className={btn}>{label}</button>
                    ))}
                </div>
            </Pane>
            {showModal && <ConfigModal configs={savedCfgs} onLoad={handleLoad}
                                       onDelete={(i) => saveCfgs(savedCfgs.filter((_, j) => j !== i))}
                                       onClose={() => setShowModal(false)}/>}
        </div>
    );
}
