import{useState,useRef}from"react";
import Pane from"../ui/Pane.jsx";
import{ALPHABET2}from"../../constants/index.js";
const PAIR_COLORS=[
    {base:"#e8a020",dim:"#7a5010",glow:"rgba(232,160,32,.55)"},
    {base:"#39d4e8",dim:"#186878",glow:"rgba(57,212,232,.55)"},
    {base:"#e03060",dim:"#801030",glow:"rgba(224,48,96,.55)"},
    {base:"#40d060",dim:"#186028",glow:"rgba(64,208,96,.55)"},
    {base:"#a040e8",dim:"#501880",glow:"rgba(160,64,232,.55)"},
    {base:"#e8d020",dim:"#786800",glow:"rgba(232,208,32,.55)"},
    {base:"#e86020",dim:"#783010",glow:"rgba(232,96,32,.55)"},
    {base:"#2080e8",dim:"#103870",glow:"rgba(32,128,232,.55)"},
    {base:"#e040a0",dim:"#801850",glow:"rgba(224,64,160,.55)"},
    {base:"#40e8b0",dim:"#187850",glow:"rgba(64,232,176,.55)"},
];
export default function PlugboardEditor({pairs,onChange}){
    const[input,setInput]=useState("");
    const[error,setError]=useState("");
    const inputRef=useRef(null);
    const pairIndexMap={};
    pairs.forEach((p,i)=>{if(p.length===2){pairIndexMap[p[0]]=i;pairIndexMap[p[1]]=i;}});
    const plugMap={};
    pairs.forEach((p)=>{if(p.length===2){plugMap[p[0]]=p[1];plugMap[p[1]]=p[0];}});
    function add(){
        const v=input.toUpperCase().replace(/[^A-Z]/g,"");
        if(v.length!==2){setError("2 letters needed");return;}
        if(v[0]===v[1]){setError("Must differ");return;}
        if(pairIndexMap[v[0]]!==undefined||pairIndexMap[v[1]]!==undefined){setError("Already used");return;}
        if(pairs.length>=10){setError("Max 10");return;}
        onChange([...pairs,v]);setInput("");setError("");
    }
    function handleKeyDown(e){
        e.stopPropagation();
        if(e.key==="Enter")add();
    }
    return(
        <Pane title={`STECKERBRETT (${pairs.length}/10)`} className="flex-1 min-h-0 flex flex-col">
            <div className="flex flex-wrap gap-[3px] justify-center mb-[7px]">
                {ALPHABET2.map((l,i)=>{
                    const pi=pairIndexMap[l];
                    const connected=pi!==undefined;
                    const col=connected?PAIR_COLORS[pi%PAIR_COLORS.length]:null;
                    return(<>
                            { (i===9||i===16) && <div className={'w-full'}/>}
                        <div key={l} className={`flex ${(i>8 && i<16)?'w-[27px]':''} w-[22px] flex-col items-center gap-[2px] cursor-default`} title={connected?`${l}↔${plugMap[l]}`:l}>
                            <div className="h-[12px] w-[12px] rounded-full border-[1.5px] transition-all" style={connected?{borderColor:col.base,backgroundColor:col.dim,boxShadow:`0 0 6px ${col.glow}`}:{borderColor:"var(--bdr)",backgroundColor:"var(--bg)"}}/>
                            <span className="font-['Oswald'] text-[7px] transition-colors" style={{color:connected?col.base:"var(--txt-b)"}}>{l}</span>
                        </div>
                        </>
                    );
                })}
            </div>
            <div className="mb-[7px] flex min-h-[20px] flex-wrap items-center gap-[4px]">
                {pairs.length===0
                    ?<span className="font-['Oswald'] text-[9px] tracking-[2px] text-[var(--txt-d)]">NO PLUGS</span>
                    :pairs.map((p,i)=>{
                        const col=PAIR_COLORS[i%PAIR_COLORS.length];
                        return(
                            <span key={p} className="inline-flex items-center gap-[3px] rounded-sm px-[5px] py-[2px] text-[11px] transition-colors" style={{color:col.base,border:`1px solid ${col.dim}`,backgroundColor:"var(--s3)"}}>
{p[0]}<span className="text-[8px]" style={{color:"var(--txt-d)"}}>↔</span>{p[1]}
                                <button onClick={()=>onChange(pairs.filter((x)=>x!==p))} className="cursor-pointer border-none bg-transparent p-0 pl-[1px] text-[11px] leading-none transition-colors hover:text-red-500" style={{color:"var(--txt-d)"}}>×</button>
</span>
                        );
                    })}
            </div>
            <div className="flex items-center gap-[6px]">
                <input ref={inputRef} value={input} maxLength={2} placeholder="AB"
                       onChange={(e)=>{setInput(e.target.value.toUpperCase().replace(/[^A-Z]/g,"").slice(0,2));setError("");}}
                       onKeyDown={handleKeyDown}
                       className="w-[52px] rounded-sm border border-[var(--bdr)] bg-[var(--s3)] px-[6px] py-[3px] text-center font-['Share_Tech_Mono'] text-[14px] tracking-[4px] uppercase text-[var(--amb)] transition-colors focus:border-[var(--amb-d)] focus:outline-none"/>
                <button onClick={add} className="cursor-pointer rounded-sm border border-[var(--bdr)] bg-[var(--met2)] px-[10px] py-[4px] font-['Oswald'] text-[9px] tracking-[2px] text-[var(--amb)] transition-all hover:border-[var(--amb)] hover:bg-[var(--amb-d)]">ADD</button>
                {error&&<span className="font-['Oswald'] text-[9px] tracking-[1px] text-red-500">{error}</span>}
            </div>
        </Pane>
    );
}