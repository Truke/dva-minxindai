import { fetchInvestsCondition, fetchInvestsList } from '../services'

export default {
  namespace: 'invests',
  state: {
    index: 1,
    tabs: [{
      title: '新手专区',
      type: 3,
      cond: 4,
      data: [],
    }, {
      title: '优选标',
      type: 1,
      cond: 0,
      data: [],
    }, {
      title: '优+系列',
      type: 4,
      cond: 3,
      data: [],
    }, /*{
      title: 'VIP专享',
      type: 2,
      cond: 1,
      data: [],
    }*/],
  },
  reducers: {
    save(state, { payload: { tabs } }) {
      return { ...state, tabs };
    },
    saveindex(state, { payload: { index } }) {
      return { ...state, index };
    },
  },
  effects: {
    *condition({ payload: { index } }, { call, put, select }) {
      const { tabs: array } = yield select(_=>_.invests)
      let { data } = yield call(fetchInvestsCondition, {type: array[index].cond})
      array[index].data = data.data.list
      yield put({
        type: 'save',
        payload: {
          tabs: array,
        },
      });
    },
    *fetch({ payload: { data } }, { call, put, select }) {
      yield call(fetchInvestsList, data)
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/invests') {
          // dispatch({ type: 'fetch' });
        }
      });
    },
  },
};