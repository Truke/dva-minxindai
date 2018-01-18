import { 
  checkBorrowStatus, 
  checkBorrowSetStatus,
  findBorrowInfo,
  findBorrowSetInfo,
} from '../services'

export default {
  namespace: 'borrow',
  state: {
    borrowType: '',
    borrowId: '',
    depositoryId: '0',
    borrowStatus: '',
    info: {
      annualRate: '0',
      loanPeriod: '',
      loanPeriodType: '',
    },
  },
  reducers: {
    saveborrow(state, { payload: { borrowType, borrowId, depositoryId } } ) {
      return {...state, borrowType, borrowId, depositoryId}
    },
    savestatus(state, { payload: { borrowStatus } }) {
      return {...state, borrowStatus}
    },
    saveinfo(state, { payload: { info } }) {
      return {...state, info}
    }
  },
  effects: {
    *fetch({ payload }, { call, put, select }) {
      const { borrowType, borrowId, depositoryId } = yield select(_ => _.borrow)
      let d = {}, res = {}
      d[(/1|4/.test(borrowType) ? 'borrowId' : 'borrowSetId')] = borrowId
      let e = Object.assign( d, depositoryId === '0' ? {} : {depositoryId})
      if (/1|4/.test(borrowType)) {
        res = yield call(checkBorrowStatus, e)
      } else {
        res = yield call(checkBorrowSetStatus, e)
      }
      if (res.data.result === 1) {
        yield put({
          type: 'savestatus',
          payload: {
            borrowStatus: res.data.data.status
          },
        });
        let res2 = yield call(findBorrowInfo, e)
        if (res2.data.result === 1) {
          yield put({
            type: 'saveinfo',
            payload: {
              info: res2.data.data
            }
          })
        }
      }
    },
    *willmoney({payload: {amount}}, {put, call, select}) {

    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/borrow') {
          dispatch({ type: 'fetch' });
        }
      });
    },
  },
};
