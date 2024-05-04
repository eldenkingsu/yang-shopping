<template>
  <div class="login">
    <van-nav-bar title="会员登录" left-arrow @click-left="$router.go('-1')" />
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input v-model="mobile" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input v-model="picCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
          <img @click="handleClickImg" v-if="picUrl" :src="picUrl" alt="" style="cursor:pointer">
        </div>
        <div class="form-item">
          <input class="inp" placeholder="请输入短信验证码" type="text" v-model="msgCode">
          <button @click="getCode">
            {{ totalSecond === second  ? '获取验证码' : second + '秒后重新发送'}}
          </button>
        </div>
      </div>
      <div class="login-btn" @click="login">登录</div>
    </div>
  </div>
</template>

<script>
// 与内部不冲突，如果调用的为全局则不需要添加this
import { getPicCode, getMsgCode, codeLogin } from '@/api/login'
export default {
  name: 'LoginPage',
  data () {
    return {
      picKey: '', // 用户输入的图形验证码唯一标识
      picUrl: '', // 请求图片的地址
      totalSecond: 60, // 总秒数
      second: 60, // 当前秒数，开定时器对second减减
      timeId: '', // 为定时器id
      mobile: '', // 手机号
      picCode: '', // 用户输入的图形验证码
      msgCode: '' // 短信验证码
    }
  },
  async created () {
    this.getPicCode()
  },
  // 离开页面清除定时器
  destroyed () {
    clearInterval(this.timeId)
  },
  methods: {
    // 从服务器提取所需要验证码的图片与标识
    async getPicCode () {
      const { data: { base64, key } } = await getPicCode()
      this.picUrl = base64
      this.picKey = key
      // this.$toast.success('获取图形验证码成功')
    },
    // 点击图片验证码获取图片
    handleClickImg () {
      this.getPicCode()
    },

    // 获取短信验证码
    async getCode () {
      // 判断手机与验证码是否为正确
      if (!this.vaildFn()) {
        return
      }
      // 当目前无定时器开着且totalsecond与second相同
      if (!this.timeId && this.second === this.totalSecond) {
        // 发送请求(预期响应非200，抛出错误，await只会等待正确的promise)
        await getMsgCode(this.picCode, this.picKey, this.mobile)
        this.$toast('短信发送成功')
        this.timeId = setInterval(() => {
          // console.log('计时中')
          this.second--
          if (this.second < 1) {
            // 当计时器减为0时需要将计时器重置
            clearInterval(this.timeId)
            this.second = this.totalSecond
          }
        }, 1000)
      }
    },

    // 校验 手机号与图形验证码是否合法
    vaildFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确图形验证码')
        return false
      }
      return true
    },
    // 登录校验
    async login () {
      if (!this.vaildFn()) {
        return
      }
      if (!/^\d{6}$/.test(this.msgCode)) {
        return
      }
      const res = await codeLogin(this.mobile, this.msgCode)
      this.$store.commit('user/setuserInfo', res.data)
      // 看地址栏有无回跳地址
      // 如果有则说明为其他网页回跳，拦截到登录，需要回跳
      const backurl = this.$route.query.backUrl || '/'
      this.$router.replace(backurl)
      this.$toast('登录成功')

      // const res = await codeLogin(this.mobile, this.msgCode)
      // console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
