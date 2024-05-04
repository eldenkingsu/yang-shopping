// postcss.config.js
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      // vm适配的标准屏宽度
      viewportWidth: 375
    }
  }
}
