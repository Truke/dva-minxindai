import { routerRedux } from 'dva/router'

export default {
  namespace: 'invests',
  state: {
    index: 1,
    tabs: [{
      title: '新手专区',
      type: 3,
      cond: 4,
    }, {
      title: '优选标',
      type: 1,
      cond: 0,
    }, {
      title: '优+系列',
      type: 4,
      cond: 3,
    }],
    storage: [],
  },
  reducers: {
    save(state, { payload: { tabs } }) {
      return { ...state, tabs };
    },
    saveindex(state, { payload: { index } }) {
      return { ...state, index };
    },
    savestorage(state, { payload: { storage, index } }) {
      state.storage[index] = storage
      return { ...state };
    }
  },
  effects: {
    *setborrow({ payload: { borrowType, borrowId, depositoryId } }, { put }) {
      yield put({
        type: 'borrow/saveborrow',
        payload: {
          borrowType, 
          borrowId, 
          depositoryId,
        }
      })
      yield put(routerRedux.push('/borrow'))
    },
  },
  subscriptions: {
  },
};