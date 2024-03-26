import React from 'react';
import { Layout, Select, Space, Button, Modal, Drawer } from 'antd';
import { cryptoData } from '../../data';
import { useCrypto } from '../../context/crypto-context';
import { useEffect, useState } from 'react';
import CoinInfoModal from '../CoinInfoModal';
import AddAssetForm from '../AddAssetForm';

const headerStyle = {
  with: '100%',
  textAlign: 'center',
  backgroundColor: '#010b1ae8',
  height: 60,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

export default function AppHeader() {
  const [select, setSelect] = useState(false)
  const [modal, setModal] = useState(false)
  const [coin, setCoin] = useState(null)
  const [drawer, setDrawer] = useState(false)
  const { crypto } = useCrypto()

  useEffect(() => {
    function keypress(event) {
      if (event.key === '/') {
        setSelect((prev) => !prev)
      }
    }
    document.addEventListener('keypress', keypress)
    return () => document.removeEventListener('keypress', keypress)
  }, [])

  function handleSelect(value) {
    console.log(value)
    setModal(true)
    setCoin(crypto.find((c) => c.id === value))
  }

  return (<Layout.Header style={headerStyle}>
    <Select
      style={{
        width: 250,
      }}
      open={select}
      onSelect={handleSelect}
      value={'press / to open'}
      optionLabelProp="label"
      onClick={() => setSelect((prev) => !prev)}
      options={crypto.map(coin => ({
        label: coin.name,
        value: coin.id,
        icon: coin.icon
      }))}
      optionRender={(option) => (
        <Space>
          <span>
            <img style={{ width: 20 }} src={option.data.icon} alt="icon" />
            {option.data.label}
          </span>
        </Space>
      )}
    />

    <Button type="primary" onClick={() => setDrawer(true)}>Add Asset</Button>

    <Modal
      open={modal}
      onCancel={() => setModal(false)}
      footer={null}
    >
      <CoinInfoModal coin={coin} />
    </Modal>

    <Drawer
      width={600}
      title="Add Asset"
      onClose={() => setDrawer(false)}
      open={drawer}
      destroyOnClose
    >
      <AddAssetForm onClose={() => setDrawer(false)} />
    </Drawer>

  </Layout.Header>)
}