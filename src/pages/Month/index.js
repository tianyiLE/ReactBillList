import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import DailyBill from './components/DayBill'

const Month = () => {
  const billList = useSelector(state => state.bill.billList)
  const monthGroup = useMemo(() => {
    const listGroupByMonth = _.groupBy(billList, (item => dayjs(item.date).format('YYYY-MM')))
    return listGroupByMonth
  }, [billList])
  const [dateVisible, setDateVisible] = useState(false)
  const [currentDate, setCurrentDate] = useState(() => dayjs(new Date()).format('YYYY-MM'))
  const [currentMonthList, setCurrentMonthList] = useState([])

  //计算 支出 、收入、结余
  const monthResult = useMemo( () => {
    const pay = currentMonthList.filter(item => item.type === 'pay').reduce((a,c) => a + c.money, 0)
    const income = currentMonthList.filter(item => item.type === 'income').reduce((a,c) => a + c.money, 0)
    return {
      pay,
      income,
      total: pay + income
    }
  },[currentMonthList])
// 初始化时把当前月的资金数据显示出来
useEffect(() => {
  const nowDate = dayjs(new Date()).format('YYYY-MM')
  if(monthGroup[nowDate])
    setCurrentMonthList(monthGroup[nowDate])
}, [monthGroup]) 



  //确认按钮的回调函数
  const onConfirm = (date) => {
    const formatDate = dayjs(date).format('YYYY-MM')
    console.log(formatDate)
    setCurrentDate(formatDate)
    setCurrentMonthList(monthGroup[formatDate])
  }

  //当前月的资金数据，根据日来分组
  const dayGroup = useMemo(() => {
    const dayGroupData = _.groupBy(currentMonthList, (item) => dayjs(item.date).format('YYYY-MM-DD'))
    const keysOfDay = Object.keys(dayGroupData)
    return {
      dayGroupData,
      keysOfDay
    }
  }, [currentMonthList]);

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
      Monthly Income and Expenses
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setDateVisible(true)}>
            <span className="text">
              {currentDate} Monthly Bill
            </span>
            <span className={classNames('arrow', dateVisible && 'expand')}></span>
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <div className="item">
              <span className="money">{monthResult.pay.toFixed(2)}</span>
              <span className="type">Pay</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.income.toFixed(2)}</span>
              <span className="type">Income</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.total.toFixed(2)}</span>
              <span className="type">Total</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="Record Date"
            precision="month"
            visible={dateVisible}
            onClose={() => setDateVisible(false)}
            onConfirm={(date) => onConfirm(date)}
            max={new Date()}
          />
        </div>
        {/* 单日列表统计 */}
        {
          dayGroup.keysOfDay.map(key => {
            return <DailyBill key={key} date={key} billList={dayGroup.dayGroupData[key]} />
          })
        }
      </div>
    </div >
  )
}

export default Month