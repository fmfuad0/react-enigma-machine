export default function RotorDetails({livePos}) {
    const titleRight = (
        <><span className="ml-[4px] my-3 flex items-center gap-[5px]">{
            [["L", 0], ["M", 1], ["R", 2]].map((
                [lbl, i]) => (
                <span key={i} className="flex items-center gap-[3px]">
                    <span className="font-['Oswald'] text-[8px] tracking-[1px] text-[var(--txt)]">{lbl}</span>
                    <span className="flex h-[25px] w-[25px] items-center justify-center rounded-sm border border-[var(--bdr)] bg-[var(--s3)] font-['Special_Elite'] text-[14px]  leading-none text-[var(--amb)] transition-colors">{livePos[i]}
                    </span>
                </span>
            ))}
            <span className="flex-1"/>
        </span>
        </>
    );

    return(
        <div className="pb-2 w-full flex items-center justify-center border-b gap-2 font-[600] font-['Oswald'] text-[15px] tracking-[3px] text-[var(--amb)]">
            ROTOR POSITION :
            {titleRight}
        </div>
    )
}