
export const state = () => ({
  loading: false
})

export const mutations = {
  increment (state) {
    state.counter++
  },
  setLoading(state, payload){
    state.loading = payload
  }
}

export const actions = {
}

export const getters = {
  loading(state){
    return state.loading
  }
}
