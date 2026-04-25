'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Currency = 'USD' | 'NGN';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  toggleCurrency: () => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('NGN');

  useEffect(() => {
    const saved = localStorage.getItem('app-currency') as Currency;
    if (saved === 'USD' || saved === 'NGN') {
      setCurrencyState(saved);
    }
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem('app-currency', c);
  };

  const toggleCurrency = () => {
    setCurrency(currency === 'USD' ? 'NGN' : 'USD');
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, toggleCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
