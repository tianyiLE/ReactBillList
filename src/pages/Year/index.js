import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'

const Year = () => {
  return (
    <div className="yearlyBill">
      <NavBar className="nav" backArrow={false}>
      Yearly Income and Expenses
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date">
            <span className="text">
              2023 
            </span>
            <span className='arrow expand'></span>
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <div className="item">
              <span className="money">{100000}</span>
              <span className="type">Pay</span>
            </div>
            <div className="item">
              <span className="money">{200000}</span>
              <span className="type">Income</span>
            </div>
            <div className="item">
              <span className="money">{100000}</span>
              <span className="type">Total</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={false}
            max={new Date()}
          />
        </div>
      </div>
    </div >
  )
}

export default Year