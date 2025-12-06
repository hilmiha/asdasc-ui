import { detectPhoneNumber } from "./inter-phone-number-helper";

export const getFormatedNumberForDisplay = (value: string): string => {
    if (!value) return '';
    
    // Remove any non-digit characters except the first minus sign
    const cleanValue = value.replace(/[^0-9-]/g, '').replace(/-+/g, (_, offset) => offset === 0 ? '-' : '');
    
    // Handle negative sign
    const isNegative = cleanValue.startsWith('-');
    const numberPart = cleanValue.replace('-', '');
    
    if (!numberPart) return isNegative ? '-' : '';
    
    // Add thousand separators (dots in your case)
    const formatted = numberPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    
    return isNegative ? `-${formatted}` : formatted;
};

export const getCleanedNumberForState = (value: string): string => {
    if (!value) return '';
    
    // Remove everything except digits and the first minus sign
    let cleaned = value.replace(/[^0-9-]/g, '');
    
    // Handle multiple minus signs - keep only the first one if it's at the beginning
    if (cleaned.includes('-')) {
        const firstMinusIndex = cleaned.indexOf('-');
        if (firstMinusIndex === 0) {
        cleaned = '-' + cleaned.substring(1).replace(/-/g, '');
        } else {
        cleaned = cleaned.replace(/-/g, '');
        }
    }
    
    // Handle leading zeros
    if (cleaned) {
        const isNegative = cleaned.startsWith('-');
        const numberPart = cleaned.replace('-', '');
        
        if (numberPart) {
        // Remove leading zeros, but keep at least one digit
        const withoutLeadingZeros = numberPart.replace(/^0+/, '') || '0';
        
        // If the result is just "0", don't add negative sign
        if (withoutLeadingZeros === '0') {
            cleaned = '0';
        } else {
            cleaned = isNegative ? `-${withoutLeadingZeros}` : withoutLeadingZeros;
        }
        }
    }
    
    return cleaned;
};

export const toTitleCase = (str:string) => {
    return str.replace(
        /\w\S*/g,
        text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
}

export function parsePropsToDocumentation(propsString: string) {
    // Remove curly braces and split by semicolon
    const cleanString = propsString.trim().replace(/^\{|\}$/g, '');
    const propLines = cleanString.split(';').filter(line => line.trim());
    
    const result = propLines.map((line, index) => {
        // Clean up the line
        const trimmedLine = line.trim();
        
        // Extract prop name (before the ? or :)
        const propMatch = trimmedLine.match(/^(\w+)\??:/);
        if (!propMatch) return null;
        
        const propName = propMatch[1];
        const isRequired = !trimmedLine.includes('?:');
        
        // Extract type (after the colon)
        const typeMatch = trimmedLine.match(/:\s*(.+)$/);
        const typeName = typeMatch ? typeMatch[1].trim() : 'unknown';
        
        return {
            id: String(index + 1),
            prop: (`<p style={{fontFamily:'monospace'}}>${propName}${isRequired ? '<span style={{color:"var(--clr-danger-700)"}}> *</span>':''}</p>`),
            type: (`<p style={{fontFamily:'monospace'}}>${typeName}</p>`),
            default: (`<p style={{fontFamily:'monospace'}}>undefined</p>`),
        };
    }).filter(Boolean);
    return result;
}

export const getFileSizeDisplay = (size: number) => {
    var fSExt = new Array("Bytes", "KB", "MB", "GB"),
    i = 0;
    while (size > 900) {
        size /= 1024;
        i++;
    }
    var exactSize = Math.round(size * 100) / 100 + " " + fSExt[i];

    return exactSize;
};

export const getFormatedPhoneNumber = (value: string) => {
    const detect = detectPhoneNumber(value);
    const code = detect.code;

    // Remove the country code from the value
    let nationalNumber = value.replace(code, ""); 

    // Ensure only digits remain
    nationalNumber = nationalNumber.replace(/\D/g, ""); 

    // Format into blocks: 3-4-4
    const part1 = nationalNumber.substring(0, 3);
    const part2 = nationalNumber.substring(3, 7);
    const part3 = nationalNumber.substring(7, 11);

    // Join parts (skip undefined)
    const formatted = [code, part1, part2, part3].filter(Boolean).join("-");

    return formatted;
};
