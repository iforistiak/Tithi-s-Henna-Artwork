/**
 * Bengali number and currency formatting utilities
 */
export const toBengaliNumber = (value: number | string): string => {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return value
    .toString()
    .replace(/[0-9]/g, (digit) => bengaliDigits[parseInt(digit, 10)]);
};

export const formatBengaliPrice = (amount: number): string => {
  return `৳${toBengaliNumber(amount.toLocaleString('en-US'))}`;
};
