export const showRaw = {
  state: () => ({
    show: false,
  }),

  mutations: {
    toggleRaw (state) {
      state.show = !state.show;
    },
  },

  // actions: {
  //   test () {
  //     console.log('==== test actions');
  //   }
  // },

  getters: {
    showRaw (state) {
      return state.show;
    },

  }
};
