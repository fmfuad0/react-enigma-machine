export const ALPHA="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const ALPHA2="QWERTZUIOASDFGHJKPYXCVBNML";
export const ALPHABET=ALPHA.split("");
export const ALPHABET2=ALPHA2.split("");
export const ROTOR_OPTIONS=["I","II","III","IV","V","VI","VII","VIII"];
export const REFLECTOR_OPTIONS=["A","B","C","B-thin","C-thin"];
export const STORAGE_KEY="enigma_saved_configs_v2";
export const DEFAULT_CONFIG={rotors:["I","II","III"],ringSettings:[1,1,1],positions:["A","A","A"],reflector:"B",plugboard:["AM","FI","NV"]};
export const THEMES={
amber:{label:"AMBER",amb:"#e8a020","amb-d":"#7a5010","amb-g":"#ffb830","amb-l":"#ffd080"},
phosphor:{label:"PHOSPHOR",amb:"#39ff14","amb-d":"#1a7008","amb-g":"#80ff50","amb-l":"#b8ffaa"},
crimson:{label:"CRIMSON",amb:"#e02840","amb-d":"#801020","amb-g":"#ff4060","amb-l":"#ff9090"},
cobalt:{label:"COBALT",amb:"#2080f0","amb-d":"#103880","amb-g":"#60b0ff","amb-l":"#a8d4ff"},
jade:{label:"JADE",amb:"#00c880","amb-d":"#006040","amb-g":"#40ffb0","amb-l":"#90ffd0"},
violet:{label:"VIOLET",amb:"#a040e8","amb-d":"#501880","amb-g":"#c878ff","amb-l":"#e0b8ff"},
gold:{label:"GOLD",amb:"#d4a800","amb-d":"#6a5400","amb-g":"#ffe040","amb-l":"#fff0a0"},
ice:{label:"ICE",amb:"#40d8e8","amb-d":"#186878","amb-g":"#80f0ff","amb-l":"#c0f8ff"},
};
export const THEME_KEYS=Object.keys(THEMES);
export const PRESETS=[
{label:"DEFAULT M3",cfg:DEFAULT_CONFIG},
{label:"BARBAROSSA",cfg:{rotors:["II","IV","V"],ringSettings:[2,21,12],positions:["B","L","A"],reflector:"B",plugboard:["AV","BS","CG","DL","FU","HZ"]}},
{label:"NAVAL",cfg:{rotors:["I","IV","VII"],ringSettings:[6,18,22],positions:["G","N","K"],reflector:"B",plugboard:["EI","AS","JN","KW","OY"]}},
{label:"NO PLUGBOARD",cfg:{rotors:["I","II","III"],ringSettings:[1,1,1],positions:["A","A","A"],reflector:"B",plugboard:[]}},
];
