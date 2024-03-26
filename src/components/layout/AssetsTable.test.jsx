import React from 'react';
import { render, screen } from '@testing-library/react';
import { CryptoContext } from '../../context/crypto-context';
import AssetsTable from './AssetsTable';

describe('Тестирование компонента AssetsTable', () => {
  it('должен успешно рендериться и отображать данные', () => {
    const mockAssets = [
      { id: '1', name: 'Bitcoin', price: '50000', amount: '2', contractAddress: '0x123' },
      { id: '2', name: 'Ethereum', price: '4000', amount: '5', contractAddress: '0x456' },
    ];

    render(
      <CryptoContext.Provider value={{ assets: mockAssets }}>
        <AssetsTable />
      </CryptoContext.Provider>
    );

    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(screen.getByText('Ethereum')).toBeInTheDocument();
    expect(screen.getByText('50000')).toBeInTheDocument();
    expect(screen.getByText('4000')).toBeInTheDocument();
  });
});