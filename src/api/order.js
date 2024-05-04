import request from '@/utils/request'
// 订单结算接口
export const checkOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode, // cart buyNow
      delivery: 10, // 快递配送
      couponId: 0, // 优惠卷使用与否
      isUsePoints: 0, // 积分
      ...obj // 将传来的参数动态展开
    }
  })
}
// 提交订单
export const submitOrder = (mode, obj) => {
  return request.post('/checkout/submit', {
    mode,
    delivery: 10,
    couponId: 0,
    isUsePoint: 0,
    paytype: 10,
    ...obj
  })
}

// 订单列表
export const getMyOrderList = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page
    }
  })
}
