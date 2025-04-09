import { ColorTheme } from "@/types/Theme";

export const shadeColor = (color: string, percent: number) => {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = ((num >> 8) & 0x00ff) + amt;
    const B = (num & 0x0000ff) + amt;
    return `#${(
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
    .toString(16)
    .slice(1)
    .toUpperCase()}`;
}

export const getColor = (color: ColorTheme): string => {
    return {
        primary: '#5DCA84',
        secondary: '#58C0B3',
        green: '#6EA944',
        warning: '#ECBA5E',
        info: '#42BDF4',
        red: '#DD524C',
        white: '#ffffff',
        blue: '#4E80EE',
    }[color]
}

export const isColorTheme = (color: any): color is ColorTheme => {
    return ['primary', 'secondary', 'green', 'warning', 'info', 'red', 'white'].includes(color);
}