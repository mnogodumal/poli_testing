import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppHeader from './AppHeader';
import { useCrypto } from '../../context/crypto-context';

jest.mock('../../context/crypto-context', () => ({
  useCrypto: jest.fn(),
}));

const mockCrypto = [
  { id: 'btc', name: 'Bitcoin', icon: 'bitcoin-icon-url' },
  { id: 'eth', name: 'Ethereum', icon: 'ethereum-icon-url' },
];

describe('AppHeader', () => {
  beforeEach(() => {
    useCrypto.mockReturnValue({
      crypto: mockCrypto,
    });
  });

  it('toggles the select dropdown on "/" keypress', async () => {
    const { getByRole } = render(<AppHeader />);
    fireEvent.keyPress(document, { key: '/', code: 'Slash' });

    await waitFor(() => {
      const select = getByRole('combobox');
      expect(select).toHaveAttribute('open', '');
    });
  });

  it('opens the modal when a crypto is selected', async () => {
    const { getByRole, getByText } = render(<AppHeader />);
    fireEvent.keyPress(document, { key: '/', code: 'Slash' });

    await waitFor(() => {
      const select = getByRole('combobox');
      fireEvent.mouseDown(select);
    });

    const option = getByText('Bitcoin');
    fireEvent.click(option);

    await waitFor(() => {
      expect(getByText('Bitcoin')).toBeInTheDocument();
    });
  });

  it('opens the drawer when the "Add Asset" button is clicked', async () => {
    const { getByText } = render(<AppHeader />);
    const addButton = getByText('Add Asset');
    fireEvent.click(addButton);

    await waitFor(() => {
      const drawerTitle = getByText('Add Asset');
      expect(drawerTitle).toBeInTheDocument();
    });
  });
});