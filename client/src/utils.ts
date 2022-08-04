export const formatCurrency = (value: number | null) =>
  value && Intl.NumberFormat('en-GB', { maximumSignificantDigits: 3 }).format(value);
