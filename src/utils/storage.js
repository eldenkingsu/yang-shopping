// 设置本地存储个人信息的key
const INFO_KEY = 'hm_shopping_info'
// 设置搜索历史的个人信息的key
const SEARCH_KEY = 'search_history'
// 获取个人信息
export const getInfo = () => {
  const defaultObj = { taken: '', userId: '' }
  const result = localStorage.getItem(INFO_KEY)
  return result ? JSON.parse(result) : defaultObj
}
// 设置个人信息
export const setInfo = (obj) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(obj))
}
export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}

// 获取搜索历史
export const getHistory = () => {
  const result = localStorage.getItem(SEARCH_KEY)
  return result ? JSON.parse(result) : []
}
// 设置搜索历史
export const setHistory = (obj) => {
  localStorage.setItem(SEARCH_KEY, JSON.stringify(obj))
}
