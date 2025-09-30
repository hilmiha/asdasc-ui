import type { RgbaColor } from "react-colorful";

/** HEX → RGBA but clamp a to 1 if alpha disabled */
export const hexToRgba = (hex: string, isAllowAlpha?:boolean): RgbaColor => {
    const m = hex.toLowerCase().replace("#", "");

    const parse3 = () =>{
        return m.split("").map((ch) => parseInt(ch + ch, 16)) as [number, number, number];
    }
    
    let r: number, g: number, b: number;
    
    if (m.length === 3) {
        [r, g, b] = parse3();
    } else {
        const bigint = parseInt(m.slice(0, 6), 16);
        r = (bigint >> 16) & 255;
        g = (bigint >> 8) & 255;
        b = bigint & 255;
    }
    const a = isAllowAlpha && m.length === 8 ? parseInt(m.slice(6, 8), 16) / 255 : 1;
    
    return { r, g, b, a };
};


/** HEX converter: omit alpha if allowAlpha = false or a === 1 */
export const rgbaToHex = (c: RgbaColor, isAllowAlpha?:boolean) => {
    const toHex = (n: number) => {
        return Math.round(n).toString(16).padStart(2, "0");
    }
    
    if (!isAllowAlpha || c.a === 1) {
        return `#${toHex(c.r)}${toHex(c.g)}${toHex(c.b)}`.toUpperCase();
    }

    const alpha = Math.round(c.a * 255);
    return `#${toHex(c.r)}${toHex(c.g)}${toHex(c.b)}${toHex(alpha)}`.toUpperCase();
};