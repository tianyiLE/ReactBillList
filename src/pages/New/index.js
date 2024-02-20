import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import Icon from '@/components/Icon'
import './index.scss'
import classNames from 'classnames'
import { billListData } from '@/contants'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBillList } from '@/store/modules/billStore'
import dayjs from 'dayjs'

const New = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //收入或者支出的状态
  const [billType, setBillType] = useState('pay')
  //金额的数目
  const [money, setMoney] = useState(0)
//收集账单的具体用途
const [usefor, setUsefor] = useState('')
const [dateVisible, setDateVisible] = useState(false)
const [date, setDate] = useState()

  //保存账单
  const saveBill = () => {
    //收集对应数据
    const data = {
        type : billType,
        money: billType === 'pay'?  -money: +money  ,
        date: date,
        usefor: usefor
    }   
        console.log(data);
        dispatch(addBillList(data))
  }

const dateComfirm = (value) => {
        setDate(value)
        console.log(value);
        setDateVisible(false)
}

  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        ADD NEW 
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames(billType === 'pay' ? 'selected' : '')}
            onClick={() => {setBillType('pay')}}
          >
            Pay
          </Button>
          <Button
            className={classNames(billType === 'income' ? 'selected' : '')}
            shape="rounded"
            onClick={() => {setBillType('income')}}
          >
            Income
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span className="text" onClick={() => setDateVisible(true)}>{dayjs(date).format("YYYY-MM-DD")}</span>
              <DatePicker
                className="kaDate"
                title="Bill Date"
                max={new Date()}
                visible={dateVisible}
                onConfirm={dateComfirm}
                onCancel={() => setDateVisible(false)}
                cancelText={'Cancel'}
                confirmText={'Confirm'}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={money}
                onChange={(value) => setMoney(value)}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {billListData[billType].map(item => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map(item => {
                  return (
                    //selected状态
                    <div
                      className={classNames(
                        'item',
                        usefor === item.type ? 'selected': ''
                      )}
                      key={item.type}
                        onClick={() => setUsefor(item.type)}
                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="btns">
        <Button className="btn save"
        onClick={saveBill}
        >
          Submit
        </Button>
      </div>
    </div>
  )
}

export default New