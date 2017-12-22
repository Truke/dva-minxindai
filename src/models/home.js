import { fetchHomeBanners, fetchHomeList } from '../services'

export default {
  namespace: 'home',
  state: {
    banners: [],
    list:[],
  },
  reducers: {
    save(state, { payload: { banners, list } }) {
      return { ...state, banners, list };
    },
  },
  effects: {
    *fetch({ payload }, { call, put, select }) {
      // const { locationQuery } = yield select(_ => _.app)
      const { data } = yield call(fetchHomeBanners, {
        nodeId: 233
      });
      const res = yield call(fetchHomeList, {
        isVip: 0,
        userId: ''
      })
      yield put({
        type: 'save',
        payload: {
          banners: data.data.list,
          list: Object.values(res.data.data)
        },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({ type: 'fetch' });
        }
      });
    },
  },
};