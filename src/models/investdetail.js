import { checkBorrowStatus, checkBorrowSetStatus } from '../services'

export default {
  namespace: 'investdetail',
  state: {
    status: [],
  },
  reducers: {},
  effects: {
    *checkStatus({ payload: { type, data } }, { call, put }) {
      let res = yield call(type ? checkBorrowStatus : checkBorrowSetStatus, data)
      console.log(res)
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        console.log(dispatch, history)
      })
    }
  },
}