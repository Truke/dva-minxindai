
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
    }, /*{
      title: 'VIP专享',
      type: 2,
      cond: 1,
    }*/],
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
  },
  subscriptions: {
  },
};