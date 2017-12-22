import { fetchInvestsCondition, fetchInvestsList } from '../services'

export default {
  namespace: 'invests',
  state: {
    tabs: [{
      title: '新手专享',
      type: 4,
    }, {
      title: '优选标',
      type: 0,
    }, {
      title: '优+系列',
      type: 3,
    }],
    list:[],
  },
  reducers: {
    save(state, { payload: { tabs, list } }) {
      return { ...state, tabs, list };
    },
  },
  effects: {
    *fetch({ payload }, { call, put, select }) {
      // const { tabs: array } = yield select(_=>_.invests)
      // for(let i = 0; i < array.length; i++) {
      //   let { data } =  yield call(fetchInvestsCondition, {type: array[i].type})
      //   array[i].data = data.data.list
      // }
      const { data } = yield call(fetchInvestsList);
      yield put({
        type: 'save',
        payload: {
          // tabs: array,
          list: data.data.list,
        },
      });
    },
    *condition({ payload: { type } }, { call, put }) {
      let { data } = yield call(fetchInvestsCondition, { type })
      yield put({
        type: 'save',
        payload: {
          tabs: data.data.list,
        },
      });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/invests') {
          dispatch({ type: 'fetch' });
        }
      });
    },
  },
};