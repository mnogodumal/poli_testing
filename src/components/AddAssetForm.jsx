import { Flex, Select, Space, Form, Input, Checkbox, Button, InputNumber, DatePicker, Result } from "antd"
import React, { useRef, useState } from "react"
import { useCrypto } from "../context/crypto-context"

export default function AddAssetForm({ onClose }) {

  const { crypto, addAsset } = useCrypto()
  const [coin, setCoin] = useState(null)
  const [form] = Form.useForm()
  const [submitted, setSubmitted] = useState(false)
  const assetRef = useRef()

  const onFinish = (values) => {
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.data?.$d ?? new Date(),
    }
    assetRef.current = newAsset
    setSubmitted(true)
    addAsset(newAsset)
  };

  function handleAmountChange(value) {
    form.setFieldsValue({
      total: +(value * coin.price).toFixed(4) + '$'
    })
  }

  function handlePriceChange(value) {
    const amount = form.getFieldValue('amount')
    form.setFieldsValue({
      total: +(amount * value).toFixed(4) + '$'
    })
  }

  if (submitted) {
    return (
      <Result
        status="success"
        title="New Asset Added"
        subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Close
          </Button>,
        ]}
      />
    )
  }

  // info

  if (!coin) {
    return (
      <Select
        style={{ width: '100%' }}
        onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
        placeholder={'press / to open'}
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
    )
  }

  return (
    <>
      <Select
        style={{ width: '100%' }}
        onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
        placeholder={'press / to open'}
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
      <Flex align="center" style={{ marginTop: 20 }}>
        <img style={{ width: 40, marginRight: 10 }} src={coin.icon} alt={coin.name} />
        <h2>{coin.name} ({coin.symbol})</h2>
      </Flex>

      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 10,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          price: coin.price.toFixed(4) + '$',
          // total: amount.value
        }}
        onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      // autoComplete="off"
      >
        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
              type: 'number',
              min: 0,
              message: 'Введите положительную сумму!',
            },
          ]}
        >
          <InputNumber onChange={handleAmountChange} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
        >
          <InputNumber onChange={handlePriceChange} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Date & Time"
          name="date"
        >
          <Space >
            <DatePicker showTime style={{ width: '100%' }} />
          </Space>
        </Form.Item>



        <Form.Item
          label="Total"
          name="total"
        >
          <InputNumber disabled style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Add Asset
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}