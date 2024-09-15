/**
 * Formats a number as currency based on the provided locale and currency type.
 * @param value - The amount to be formatted.
 * @param currencyType - The type of currency to format the amount in. Assuming currency type in ISO 4217 format eg: GBP, INR, EUR
 * @param locale - The locale to use for formatting. Defaults to 'en-US'.
 * @returns The formatted currency string.
 */
export const formatCurrency = (value: number, currencyType: string, locale: string = 'en-US'): string => {
    if(currencyType && value && currencyType.length >= 3) {
        let currencyCode = currencyType;
        let remainingPart = "";

        if(currencyType.length > 3) { // If currency value is something like GBP/day or GBP/hour
            currencyCode = currencyType.substring(0,3); //Assuming currency data is always returned in ISO 4217 format
            remainingPart = currencyType.substring(3);
        }

        const formattedCurrency =  new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currencyCode,
          }).format(value);
        
        return formattedCurrency + remainingPart;
    } else {
        return "" // TODO: based on additional requirement refactor logic to handle if currency or value is null or in wrong format
    } 
};