import React from 'react';
import { render, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AppSider from './AppSider';
import { CryptoContext } from '../../context/crypto-context';

describe('Тестирование AppSider', () => {
  it('корректно рендерит карточки активов', () => {
    const assets = [
      { id: 'bitcoin', totalAmount: 100, grow: true, totalProfit: 10, amount: 1, growPercent: 5 },
      { id: 'ethereum', totalAmount: 50, grow: false, totalProfit: -5, amount: 0.5, growPercent: -10 }
    ];

    const { getByText } = render(
      <CryptoContext.Provider value={{ assets }}>
        <AppSider />
      </CryptoContext.Provider>
    );

    expect(getByText('Bitcoin')).toBeInTheDocument();
    expect(getByText('Ethereum')).toBeInTheDocument();

    const bitcoinCard = getByText('Bitcoin').closest('.ant-card');
    const ethereumCard = getByText('Ethereum').closest('.ant-card');

    expect(within(bitcoinCard).getByText('100.00$')).toBeInTheDocument();
    expect(within(bitcoinCard).getByTestId('arrow-up-outlined')).toBeInTheDocument();

    expect(within(ethereumCard).getByText('50.00$')).toBeInTheDocument();
    expect(within(ethereumCard).getByTestId('arrow-down-outlined')).toBeInTheDocument();
  });
});