export const userProfile = {
  state: () => ({
    authorized: false,
  }),

  mutations: {
    login (state) {
      state.authorized = true;
    },

    logout (state) {
      state.authorized = false;
    },
  },

  actions: {
    test () {
      console.log('==== test actions');
    }
  },

  getters: {
    isAuthorized (state) {
      return state.authorized;
    },

  }
};
