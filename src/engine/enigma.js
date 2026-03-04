const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const idx = (c) => ALPHA.indexOf(c);
const chr = (n) => ALPHA[((n % 26) + 26) % 26];
const ROTOR_DB = {
    I: {wiring: "EKMFLGDQVZNTOWYHXUSPAIBRCJ", notch: "Q"},
    II: {wiring: "AJDKSIRUXBLHWTMCQGZNPYFVOE", notch: "E"},
    III: {wiring: "BDFHJLCPRTXVZNYEIWGAKMUSQO", notch: "V"},
    IV: {wiring: "ESOVPZJAYQUIRHXLNFTGKDCMWB", notch: "J"},
    V: {wiring: "VZBRGITYUPSDNHLXAWMJQOFECK", notch: "Z"},
    VI: {wiring: "JPGVOUMFYQBENHZRDKASXLICTW", notch: "ZM"},
    VII: {wiring: "NZJHGRCXMYSWBOUFAIVLPEKQDT", notch: "ZM"},
    VIII: {wiring: "FKQHTLXOCBJSPDZRAMEWNIUYGV", notch: "ZM"}
};
export const REFLECTOR_DB = {
    A: "EJMZALYXVBWFCRQUONTSPIKHGD",
    B: "YRUHQSLDPXNGOKMIEBFZCWVJAT",
    C: "FVPJIAOYEDRZXWGCTKUQSBNMHL",
    "B-thin": "ENKQAUYWJICOPBLMDXZVFTHRGS",
    "C-thin": "RDOBJNTKVEHMLFCWZAXGYIPSUQ"
};

function rotorFwd(wiring, pos, ring, input) {
    const e = (input + pos - ring + 26) % 26;
    return (idx(wiring[e]) - pos + ring + 26) % 26;
}

function rotorBwd(wiring, pos, ring, input) {
    const e = (input + pos - ring + 26) % 26;
    return (wiring.indexOf(ALPHA[e]) - pos + ring + 26) % 26;
}

export function enigmaStep(rotorNames, positions, ringSettings, reflector, plugPairs, inputChar) {
    const plug = {};
    for (const p of plugPairs) if (p.length === 2) {
        plug[p[0]] = p[1];
        plug[p[1]] = p[0];
    }
    const pos = positions.map(idx);
    const ring = ringSettings.map((r) => r - 1);
    const notches = rotorNames.map((n) => (ROTOR_DB[n] || ROTOR_DB["I"]).notch);
    const rightAtNotch = notches[2].includes(chr(pos[2]));
    const middleAtNotch = notches[1].includes(chr(pos[1]));
    const p = [...pos];
    if (middleAtNotch) {
        p[0] = (pos[0] + 1) % 26;
        p[1] = (pos[1] + 1) % 26;
    }
    if (rightAtNotch) {
        p[1] = (p[1] + 1) % 26;
    }
    p[2] = (pos[2] + 1) % 26;
    let sig = idx(inputChar.toUpperCase());
    if (sig < 0) return null;
    sig = idx(plug[ALPHA[sig]] || ALPHA[sig]);
    for (let i = 2; i >= 0; i--) sig = rotorFwd((ROTOR_DB[rotorNames[i]] || ROTOR_DB["I"]).wiring, p[i], ring[i], sig);
    sig = idx((REFLECTOR_DB[reflector] || REFLECTOR_DB["B"])[sig]);
    for (let i = 0; i <= 2; i++) sig = rotorBwd((ROTOR_DB[rotorNames[i]] || ROTOR_DB["I"]).wiring, p[i], ring[i], sig);
    return {output: plug[ALPHA[sig]] || ALPHA[sig], newPositions: p.map(chr)};
}

export function enigmaEncryptString(rotorNames, startPositions, ringSettings, reflector, plugPairs, text) {
    let positions = [...startPositions], output = "";
    for (const ch of text.toUpperCase().replace(/[^A-Z]/g, "")) {
        const res = enigmaStep(rotorNames, positions, ringSettings, reflector, plugPairs, ch);
        if (!res) continue;
        output += res.output;
        positions = res.newPositions;
    }
    return output;
}
