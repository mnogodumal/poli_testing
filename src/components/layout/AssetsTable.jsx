import React from 'react';
import { Table } from 'antd';
import { useCrypto } from '../../context/crypto-context';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',

    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Price, $',
    dataIndex: 'price',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Contract Address',
    dataIndex: 'contractAddress',
    // defaultSortOrder: 'descend',
    // sorter: (a, b) => a.amount - b.amount,
  },
];




export default function AssetsTable() {
  const { assets } = useCrypto()

  const data = assets.map((a) => ({
    key: a.id,
    name: a.name,
    price: a.price,
    amount: a.amount,
    contractAddress: a.contractAddress,
  }))

  return <Table pagination={false} columns={columns} dataSource={data} />
}


// новый коммит