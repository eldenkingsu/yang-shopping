export default {
  // 此处编写Vue组件实例的 配置项，通过一定语法，可以直接混入组件内部,跨组件使用
  // data methods 生命周期函数会与页面统一管理
  data () {
    return {
      title: '标题'
    }
  },
  methods: {
    sayHi () {
      console.log('hi')
    },
    loginConfirm () {
      if (!this.$store.getters.token) {
        // console.log('弹出对话框')
        this.$dialog.confirm({
          confirmButtonText: '去登陆',
          cancelButtonText: '再逛逛',
          title: '温馨提示',
          message: '此时需要先登录才能继续操作'
        }).then(() => {
          // 希望登陆后回弹到登录，需要跳转携带参数（当前路径地址）
          // this.$route.fullPath //replace为代替之前存在的网页，push为向前叠加网页
          this.$router.replace({
            path: '/login',
            query: {
              backUrl: this.$route.fullPath
            }
          })
        }).catch(() => {
        })
        return true
      }
      return false
    }
  }
}
