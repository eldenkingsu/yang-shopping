import { getInfo, setInfo } from '@/utils/storage'
export default {
  namespaced: true,
  state () {
    return {
      // 个人信息
      userInfo: getInfo()
    }
  },
  getters: {
  },
  mutations: {
    setuserInfo (state, obj) {
      state.userInfo = obj
      setInfo(obj)
    }
  },
  actions: {
    logout (context) {
      // 个人信息重置
      context.commit('setuserInfo', {})
      // 购物车重置
      context.commit('cart/setCartList', [], { root: true })
    }
  }

}
