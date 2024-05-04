<template>
  <div class="count-box">
    <button class="sub" @click="handlesub">-</button>
    <input :value="value" @change="handlechange" class="inp" type="text">
    <button class="add" @click="handleadd">+</button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    handlesub () {
      if (this.value <= 1) {
        return
      }
      this.$emit('input', this.value - 1)
    },
    handleadd () {
      this.$emit('input', this.value + 1)
    },
    handlechange (e) {
      // console.log(e.target.value)
      const num = +e.target.value // 转数字
      // 判断num是否不合法
      if (isNaN(num) || num < 1) {
        e.target.value = this.value
        return
      }
      this.$emit('input', num)
    }
  }
}
</script>

<style lang="less">
.count-box{
  width: 110px;
  display: flex;
  .add,.sub{
    width: 30px;
    height: 30px;
    outline: none;
    border: none;
    background-color: #efefef;
  }
  .inp{
    width: 40px;
    height: 30px;
    outline: none;
    border: none;
    margin: 0 5px;
    background-color: #efefef;
    text-align: center;
  }
}
</style>
