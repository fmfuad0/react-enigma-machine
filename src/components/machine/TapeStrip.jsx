    import Pane from "../ui/Pane.jsx";

    export default function TapeStrip({tapedIn, tapedOut, onReset, onClear}) {
        return (<>
            <Pane className="flex-shrink-0" title={'INPUT'}>
                <div className="items-stretch">
                    <div className="min-w-0 flex-1 h-[49%]">
                        <div
                            className="min-h-[250px] break-all rounded-sm border border-[var(--bdr2)] bg-[var(--s3)] px-[8px] py-[5px] font-['Share_Tech_Mono'] text-[13px] leading-[1.6] tracking-[3px] text-[var(--txt)]">
                            {tapedIn ? tapedIn.match(/.{1,5}/g)?.join(" ") :
                                <span className="font-['Oswald'] text-[9px] tracking-[3px] text-[var(--txt)] font-[500]">TYPE TO ENCRYPT</span>}
                        </div>
                    </div>
                </div>
            </Pane>
                    <div className="mx-[8px] flex-shrink-0 bg-[var(--bdr2)]"/>
        <Pane className="flex-shrink-0" title={'OUTPUT'}>
                    <div className="w-full flex-1 h-[49%]">
                        <div
                            className="min-h-[250px] break-all rounded-sm border border-[var(--bdr2)] bg-[var(--s3)] px-[8px] py-[5px] font-['Share_Tech_Mono'] text-[13px] leading-[1.6] tracking-[3px] text-[var(--amb)] transition-colors">
                            {tapedOut ? tapedOut.match(/.{1,5}/g)?.join(" ") : <span
                                className="font-['Oswald'] text-[9px] tracking-[3px] text-[var(--txt)] font-[500]">CIPHER TEXT</span>}
                        </div>
                    </div>
                    <div className="mt-2 p-5 flex flex-shrink-0 justify-center gap-[4px]">
                        <button onClick={onReset} title="Reset"
                                className="flex h-[40px] w-full cursor-pointer items-center justify-center rounded-sm border border-[var(--bdr2)] bg-[var(--met)] text-[23px] leading-none text-[var(--txt-d)] transition-all hover:border-[var(--red)] hover:text-[var(--red)] rounded-r-full">↺
                        </button>
                        {tapedOut && <button onClick={() => navigator.clipboard?.writeText(tapedOut)} title="Copy"
                                             className="flex h-[40px] w-full cursor-pointer items-center justify-center rounded-sm border border-[var(--bdr2)] bg-[var(--met)] text-[23px] leading-none text-[var(--txt-d)] transition-all hover:border-[lime] hover:text-[lime] rounded-full">⎘</button>}
                        {tapedIn && <button onClick={onClear} title="Clear"
                                            className="flex h-[40px] w-full cursor-pointer items-center justify-center rounded-sm border border-[var(--bdr2)] bg-[var(--met)] text-[23px] leading-none text-[var(--txt-d)] transition-all hover:border-[var(--amb-d)] hover:text-[var(--amb)] rounded-l-full">✕</button>}
                    </div>
            </Pane></>
        );
    }
