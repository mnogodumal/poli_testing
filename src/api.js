import { cryptoAssets, cryptoData } from './data'

export function fakeFetchCrypto() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(cryptoData)
    }, 1)
  })
}

export function fetchAssets() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(cryptoAssets)
    }, 1)
  })
}


// import axios from 'axios';

// export const fetchCryptoPrice = async (cryptoId) => {
//   try {
//     const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoId}&vs_currencies=usd`);

//     // Обработка данных
//     const cryptoPrice = response.data[cryptoId].usd;
//     console.log(`Цена ${cryptoId}: $${cryptoPrice}`);

//     // Вернуть цену для использования в вашем компоненте
//     return cryptoPrice;
//   } catch (error) {
//     console.error('Ошибка при получении данных:', error);
//     // Обработка ошибки
//   }
// };

// // Пример использования
// fetchCryptoPrice('bitcoin');