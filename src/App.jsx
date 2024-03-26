import AppLayout from './components/layout/AppLayout';
import { CryptoCentextProvider } from './context/crypto-context';

export default function App() {
  return (
    <CryptoCentextProvider>
      <AppLayout />
    </CryptoCentextProvider>
  )
}
