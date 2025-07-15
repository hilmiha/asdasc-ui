export const formatNumberForDisplay = (value: string): string => {
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