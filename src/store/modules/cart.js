import { getCartList, changeCount, delSelect } from '@/api/cart'
import { Toast } from 'vant'
export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    // 提供设置cartlist的mutation
    setCartlist (state, newList) {
      state.cartList = newList
    },
    // 点击选中的复选框进行取反
    toggleChecked (state, id) {
      const goods = state.cartList.find(item => item.goods_id === id)
      goods.isChecked = !goods.isChecked
    },
    // 点击全选按钮设置全部复选框选中
    toggleAllChecked (state, flag) {
      state.cartList.forEach(item => {
        item.isChecked = flag
      })
    },
    // 修改本地的数量
    changeCount (state, { goodsId, goodsNum }) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.goods_num = goodsNum
    }
  },
  getters: {
    // 求所有商品累加总数
    cartTotal (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中商品的数组
    selCartList (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    // 选中商品的总数
    selCount (state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中商品总价
    selPrice (state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods_num * item.goods.goods_price_min, 0).toFixed(2)
    },
    isAllChecked (state) {
      return state.cartList.every(item => item.isChecked)
    }
  },

  actions: {
    // actions默认传参为context,context.commit调用mutations
    // 获去后台购物车内数据
    async getCartAction (context) {
      const { data } = await getCartList()
      data.list.forEach(item => {
        item.isChecked = true
      })
      // console.log(data)
      context.commit('setCartlist', data.list)
    },

    // 改变后台与本地中购物车商品数量
    async changeCountAction (context, obj) {
      const { goodsNum, goodsId, goodsSkuId } = obj
      // 先本地修改
      context.commit('changeCount', { goodsId, goodsNum })
      await changeCount(goodsId, goodsNum, goodsSkuId)
    },

    // 删除购物车中商品
    async delAction (context) {
      const selectCartList = context.getters.selCartList
      const CartIds = selectCartList.map(item => item.id)
      await delSelect(CartIds)
      Toast('删除成功')
      // 重新拉去购物车数据
      context.dispatch('getCartAction')
    }
  }
}
