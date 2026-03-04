import {useState, useRef, useCallback, useEffect} from "react";
import {enigmaStep} from "./engine/enigma.js";
import {DEFAULT_CONFIG, THEME_KEYS} from "./constants/index.js";
import Header from "./components/layout/Header.jsx";
import MachineTab from "./components/machine/MachineTab.jsx";
import TextTab from "./components/tabs/TextTab.jsx";
import ConfigTab from "./components/tabs/ConfigTab.jsx";
import Footer from "./components/layout/Footer.jsx";

export default function App() {
    const [config, setConfig] = useState(DEFAULT_CONFIG);
    const livePosRef = useRef([...DEFAULT_CONFIG.positions]);
    const [livePos, setLivePos] = useState([...DEFAULT_CONFIG.positions]);
    const configRef = useRef(config);
    useEffect(() => {
        configRef.current = config;
    }, [config]);
    const [litLetter, setLitLetter] = useState(null);
    const [pressedKey, setPressedKey] = useState(null);
    const [tapedIn, setTapedIn] = useState("");
    const [tapedOut, setTapedOut] = useState("");
    const [activeTab, setActiveTab] = useState("machine");
    const [theme, setTheme] = useState("amber");
    const [wasmStatus] = useState("js");
    const litTimer = useRef(null);
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    function applyLivePos(p) {
        livePosRef.current = [...p];
        setLivePos([...p]);
    }

    function handleRotorChange(i, field, value) {
        setConfig((prev) => {
            const next = {...prev};
            if (field === "rotor") {
                next.rotors = [...prev.rotors];
                next.rotors[i] = value;
            }
            if (field === "position") {
                next.positions = [...prev.positions];
                next.positions[i] = value;
                const lp = [...livePosRef.current];
                lp[i] = value;
                applyLivePos(lp);
            }
            if (field === "ring") {
                next.ringSettings = [...prev.ringSettings];
                next.ringSettings[i] = value;
            }
            return next;
        });
    }

    function handleReflectorChange(value) {
        setConfig((p) => ({...p, reflector: value}));
    }

    function handlePlugboardChange(plugboard) {
        setConfig((p) => ({...p, plugboard}));
    }

    const handleKeyPress = useCallback((letter) => {
        const cfg = configRef.current;
        const result = enigmaStep(cfg.rotors, livePosRef.current, cfg.ringSettings, cfg.reflector, cfg.plugboard, letter);
        if (!result) return;
        livePosRef.current = result.newPositions;
        setLivePos([...result.newPositions]);
        clearTimeout(litTimer.current);
        setPressedKey(letter);
        setLitLetter(result.output);
        setTapedIn((t) => t + letter);
        setTapedOut((t) => t + result.output);
        litTimer.current = setTimeout(() => {
            setLitLetter(null);
            setPressedKey(null);
        }, 220);
    }, []);

    function resetMachine() {
        applyLivePos(configRef.current.positions);
        setTapedIn("");
        setTapedOut("");
        setLitLetter(null);
        setPressedKey(null);
    }

    function clearTape() {
        setTapedIn("");
        setTapedOut("");
    }

    function applyPreset(cfg) {
        setConfig(cfg);
        applyLivePos(cfg.positions);
        setTapedIn("");
        setTapedOut("");
    }

    return (
        <div className="app flex h-screen flex-col overflow-hidden px-[12px]">
            <Header activeTab={activeTab} onTabChange={setActiveTab} theme={theme} onThemeChange={setTheme}
                    wasmStatus={wasmStatus}/>
            {activeTab === "machine" &&
                <MachineTab config={config} onRotorChange={handleRotorChange} onReflectorChange={handleReflectorChange}
                            onPlugboardChange={handlePlugboardChange} livePos={livePos} litLetter={litLetter}
                            pressedKey={pressedKey} onKeyPress={handleKeyPress} tapedIn={tapedIn} tapedOut={tapedOut}
                            onReset={resetMachine} onClear={clearTape}/>}
            {activeTab === "text" && <TextTab config={config}/>}
            {activeTab === "config" && <ConfigTab config={config} onApplyPreset={applyPreset}/>}
            <Footer/>
        </div>
    );
}
