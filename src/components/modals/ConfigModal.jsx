export default function ConfigModal({configs, onLoad, onDelete, onClose}) {
    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/88 backdrop-blur-[3px]"
             onClick={onClose}>
            <div
                className="flex max-h-[80vh] w-[480px] max-w-[95vw] flex-col rounded-[4px] border border-[var(--bdr)] bg-[var(--s1)]"
                onClick={(e) => e.stopPropagation()}>
                <div
                    className="flex items-center justify-between border-b border-[var(--bdr)] px-[16px] py-[12px] font-['Oswald'] text-[10px] tracking-[3px] text-[var(--amb)]">
                    <span>SAVED CONFIGURATIONS</span>
                    <button onClick={onClose}
                            className="cursor-pointer border-none bg-transparent text-[18px] leading-none text-[var(--txt-d)] hover:text-red-500">×
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto px-[16px] py-[12px]">
                    {configs.length === 0
                        ? <div
                            className="py-[24px] text-center font-['Oswald'] text-[10px] tracking-[2px] text-[var(--txt-d)]">NO
                            SAVED CONFIGURATIONS</div>
                        : configs.map((c, i) => (
                            <div key={i}
                                 className="mb-[6px] flex items-center gap-[10px] rounded-[2px] border border-[var(--bdr)] bg-[var(--s2)] p-[10px]">
                                <div className="min-w-0 flex-1">
                                    <div
                                        className="mb-[2px] font-['Oswald'] text-[13px] text-[var(--amb)]">{c.name}</div>
                                    <div
                                        className="mb-[2px] font-['Oswald'] text-[9px] tracking-[1px] text-[var(--txt-d)]">{c.rotors.join("-")} ·
                                        UKW-{c.reflector} · {c.plugboard.length} plugs
                                    </div>
                                    <div
                                        className="font-['Oswald'] text-[8px] text-[var(--txt-d)] opacity-50">{c.savedAt}</div>
                                </div>
                                <div className="flex flex-shrink-0 gap-[5px]">
                                    <button onClick={() => onLoad(c)}
                                            className="cursor-pointer rounded-[2px] border border-[var(--amb)] bg-[var(--amb-d)] px-[9px] py-[4px] font-['Oswald'] text-[9px] tracking-[2px] text-[var(--amb-l)] hover:brightness-125">LOAD
                                    </button>
                                    <button onClick={() => onDelete(i)}
                                            className="cursor-pointer rounded-[2px] border border-[#3a1810] bg-transparent px-[9px] py-[4px] font-['Oswald'] text-[9px] tracking-[2px] text-[#785040] hover:border-red-500 hover:text-red-400">DEL
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
