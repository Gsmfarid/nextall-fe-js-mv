import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useCurrencyFormatter = () => {
  const { currency } = useSelector((state) => state.settings); // Access currency and rate from Redux

  const [formatter, setFormatter] = useState(null);
  const locale = 'en-US';
  useEffect(() => {
    if (currency && locale) {
      const newFormatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency
      });
      setFormatter(newFormatter);
    }
  }, [currency, locale]); // Update formatter on currency or locale change

  const formatCurrency = (number) => {
    if (!formatter) return number; // Handle cases where currency or locale haven't loaded yet
    return formatter.format(Number(number)).slice(0, -1);
  };

  return formatCurrency;
};
