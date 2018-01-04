

export default {
  namespace: 'borrow',
  state: {
    borrowType: '',
    borrowId: '',
    depositoryId: 0,
  },
  reducers: {
    saveborrow(state, { payload: { borrowType, borrowId, depositoryId } } ) {
      return {...state, borrowType, borrowId, depositoryId}
    },
  },
  effects: {

  },
  subscriptions: {},
};
