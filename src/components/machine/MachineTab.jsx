import RotorAssembly from "./RotorAssembly.jsx";
import PlugboardEditor from "./PlugboardEditor.jsx";
import Lampboard from "./Lampboard.jsx";
import EnigmaKeyboard from "./EnigmaKeyboard.jsx";
import TapeStrip from "./TapeStrip.jsx";
import RotorDetails from "./RotorDetails.jsx";

export default function MachineTab({
                                       config,
                                       onRotorChange,
                                       onReflectorChange,
                                       onPlugboardChange,
                                       livePos,
                                       litLetter,
                                       pressedKey,
                                       onKeyPress,
                                       tapedIn,
                                       tapedOut,
                                       onReset,
                                       onClear
                                   }) {
    return (<>
            <RotorDetails livePos={livePos}/>
            <div className="machine-grid min-h-0 flex-1 overflow-hidden gap-[8px] py-[8px]"
                 style={{display: "grid", gridTemplateColumns: "310px 1fr"}}>
                <div className="col-left flex min-h-0 flex-col gap-[8px] overflow-hidden">
                    <RotorAssembly config={config} onRotorChange={onRotorChange} onReflectorChange={onReflectorChange}/>
                    <PlugboardEditor pairs={config.plugboard} onChange={onPlugboardChange}/>
                </div>
                <div>
                    <div className="flex gap-[8px] h-full overflow-hidden justify-center">
                        <div className={`h-full w-[50%]`}>
                            <div className={`h-[50%]`}>
                                <Lampboard litLetter={litLetter}/>
                            </div>
                            <div className={`h-[50%]`}>
                                <EnigmaKeyboard onPress={onKeyPress} pressedKey={pressedKey}/>
                            </div>
                        </div>
                        <div className={'h-full w-[50%]'}>
                            <TapeStrip tapedIn={tapedIn} tapedOut={tapedOut} onReset={onReset} onClear={onClear}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
