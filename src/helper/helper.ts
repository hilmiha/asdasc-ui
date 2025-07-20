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