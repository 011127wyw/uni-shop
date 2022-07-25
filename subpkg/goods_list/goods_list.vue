<template>
  <view>
    <view class="goods-list">
      <view v-for="(item, i) in goodsList" :key="i" @click="gotoDetail(item)">
        <my-goods :goods="item"></my-goods>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 请求参数对象
        queryObj: {
          // 查询关键词
          query: '',
          // 商品分类Id
          cid: '',
          // 页码值
          pagenum: 1,
          // 每页显示多少条数据
          pagesize: 10
        },
        // 商品列表的数据
        goodsList: [],
        // 总数量，用来实现分页
        total: 0,
        // 是否正在请求数据 (节流阀)
        isloading: false
      }
    },
    onLoad(options) {
      // 将页面参数转存到 this.queryObj 对象中
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      // 调用获取商品列表数据的方法
      this.getGoodsList()
    },
    methods: {
      // 获取商品列表数据的方法
      async getGoodsList(cb) {
        // 要请求数据 打开节流阀
        this.isloading = true
        // 发起请求
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        // 请求到了数据 关闭节流阀
        this.isloading = false

        // 接收回调函数并按需引入  只要数据请求完毕，就立即按需调用 cb 回调函数
        cb && cb()

        if (res.meta.status !== 200) return uni.$showMsg()
        // 为数据赋值：通过展开运算符的形式，进行新旧数据的拼接
        this.goodsList = [...this.goodsList, ...res.message.goods]
        this.total = res.message.total
      },

      // 点击商品详情跳转处理函数
      gotoDetail(item) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      }
    },
    // 触底事件
    // onReachBottom() {
    //   // 判断是否还有下一页数据
    //   if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('到底了哦，亲！')

    //   // 判断是否正在请求其它数据，如果是，则不发起额外的请求
    //   if (this.isloading) return

    //   // 让页码自增 +1
    //   this.queryObj.pagenum += 1
    //   // 重新获取列表数据
    //   this.getGoodsList()
    // },
    // onPullDownRefresh() {
    //   // 1. 重置关键数据
    //   this.queryObj.pagenum = 1
    //   this.total = 0
    //   this.isloading = false
    //   this.goodsList = []

    //   // 2. 重新发起请求
    //   // 这里将关闭下拉刷新的回调函数(即cb())当成参数传入 getGoodsList 函数
    //   this.getGoodsList(() => uni.stopPullDownRefresh())
    // }
  }
</script>

<style lang="scss">

</style>
