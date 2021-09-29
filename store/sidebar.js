export const state = () => ({
  sidebar: null
})

export const mutations = {
  setSidebar(state, payload){
    state.sidebar = payload
  }
}
