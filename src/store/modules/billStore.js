// 账单相关的store
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const billStore = createSlice({
    name: "bill",
    initialState: {
        billList: []
    },
    reducers: {
        setBillList(state, action) {
            state.billList = action.payload
        }
    }
})

//解构出action
const {setBillList} = billStore.actions

//编写异步请求 并导出
const getBillList = () => {
    return async (dispatch) => {
        const res = await axios.get("https://tianyile-reactbilllist.onrender.com/ka")
        dispatch(setBillList(res.data))
    }
}

const addBillList = (data) => {
    return async (dispatch) => {
        const res = await axios.post("https://tianyile-reactbilllist.onrender.com/ka", data)
        dispatch(setBillList(res.data))
    }
}
export {getBillList, addBillList}


//到处reducer
const billReducer = billStore.reducer

export default billReducer