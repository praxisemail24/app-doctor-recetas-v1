export const fixUTF8 = (text?: string): string => {
    if(text === undefined || text === null) return ''

    return new TextDecoder("utf-8").decode(new TextEncoder().encode(fixSpecialChars(text)));
}

export const fixSpecialChars = (text: string): string => {
    return text
        .replace(/Ã¡/g, "á")
        .replace(/Ã©/g, "é")
        .replace(/Ã­/g, "í")
        .replace(/Ã³/g, "ó")
        .replace(/Ãº/g, "ú")
        .replace(/Ã±/g, "ñ")
        .replace(/Ã€/g, "À")
        .replace(/â€“/g, "–")
        .replace(/â€™/g, "’"); 
}

export const truncateText = (text?: string, len?: number): string => {
    if(text === undefined || text === null) return ''
    text = fixSpecialChars(text)
    return text.length > (len ?? 50) ? `${text.substring(0, len)}...` : text
}

export const randomNumber = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
}

export const randomStr = (length: number = 12): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export const toFixedNumber = (n: any, d: number = 2) => {
    return parseFloat(n).toFixed(d)
}