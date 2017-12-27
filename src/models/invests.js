import { fetchInvestsCondition } from '../services'

export default {
  namespace: 'invests',
  state: {
    index: 1,
    mask: false,
    tabs: [{
      title: '新手专享',
      type: 4,
      data: [],
      lists: []
    }, {
      title: '优选标',
      type: 0,
      data: [],
      lists: []
    }, {
      title: '优+系列',
      type: 3,
      data: [],
      lists: []
    }],
  },
  reducers: {
    save(state, { payload: { tabs, index } }) {
      return { ...state, tabs, index };
    },
    saveindex(state, { payload: { index } }) {
      return { ...state, index };
    },
    showMask(state) {
      state.mask = true
      return { ...state }
    },
    hideMask(state) {
      state.mask = false
      return { ...state }
    }
  },
  effects: {
    *fetch({ payload }, { call, put, select }) {
      const { index, tabs: array } = yield select(_=>_.invests)
      for(let i = 0; i < array.length; i++) {
        let { data } =  yield call(fetchInvestsCondition, {type: array[i].type})
        array[i].options[0].data = data.data.list
      }
      // const { data } = yield call(fetchInvestsList);
      yield put({
        type: 'save',
        payload: {
          tabs: array,
          index,
        },
      });
    },
    *condition({ payload: { index } }, { call, put, select }) {
      const { tabs: array } = yield select(_=>_.invests)
      let { data } = yield call(fetchInvestsCondition, {type: array[index].type})
      array[index].data = data.data.list
      yield put({
        type: 'save',
        payload: {
          tabs: array,
          index,
        },
      });
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