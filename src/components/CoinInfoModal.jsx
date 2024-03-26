import { Divider, Flex, Tag, Typography } from 'antd'

export default function CoinInfoModal({ coin }) {
  return (
    <>
      <Flex align='center'>
        <img src={coin.icon} alt={coin.name} style={{ width: 38 }} />
        <Typography.Title level={2} style={{ marginBottom: 0, marginLeft: 10 }}>({coin.symbol}) {coin.name}</Typography.Title>
      </Flex>
      <Divider />
      <Typography.Paragraph>
        <Typography.Text strong style={{ marginRight: 10 }}>1 hour:</Typography.Text>
        <Tag color={coin.priceChange1h > 0 ? 'green' : 'red'}>{coin.priceChange1h}%</Tag>

        <Typography.Text strong style={{ marginRight: 10 }}>1 day:</Typography.Text>
        <Tag color={coin.priceChange1d > 0 ? 'green' : 'red'}>{coin.priceChange1d}%</Tag>

        <Typography.Text strong style={{ marginRight: 10 }}>1 week:</Typography.Text>
        <Tag color={coin.priceChange1w > 0 ? 'green' : 'red'}>{coin.priceChange1w}%</Tag>
      </Typography.Paragraph>

      <Typography.Paragraph>
        <Typography.Text strong style={{ marginRight: 5 }}>Price:</Typography.Text>
        {(coin.price).toFixed(4)}$
      </Typography.Paragraph>

      <Typography.Paragraph>
        <Typography.Text strong style={{ marginRight: 5 }}>Price BTC:</Typography.Text>
        {coin.priceBtc}
      </Typography.Paragraph>

      <Typography.Paragraph>
        <Typography.Text strong style={{ marginRight: 5 }}>Market Cap:</Typography.Text>
        {coin.marketCap}$
      </Typography.Paragraph>

      {coin.contractAddress && <Typography.Paragraph>
        <Typography.Text strong style={{ marginRight: 5 }}>Contract Address:</Typography.Text>
        {coin.contractAddress}
      </Typography.Paragraph>}
    </>
  )
}