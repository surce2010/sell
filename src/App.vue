<template>
    <div>
        <v-header :seller="seller"></v-header>
        <div class="tab border-1px">
            <div class="tab-item">
                <router-link to="/goods">商品</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/ratings">评论</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/seller">商家</router-link>
            </div>
        </div>
        <router-view :seller="seller"></router-view>
    </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
    @import 'common/stylus/mixin.styl'
    .tab
        display flex
        width 100%
        height 40px
        line-height 40px
        border-1px(rgba(7, 17, 27, 0.1))
        .tab-item
            flex 1
            text-align center
            a
                color rgb(77, 85, 93)
                font-size 14px
                text-decoration none
                &.router-link-active
                    color rgb(240, 20, 20)
                    font-size 14px
</style>

<script>
    import header from 'components/header/'

    const ERR_OK = 0;

    export default {
        data: function() {
            return {
                seller: {}
            };
        },
        created() {
            this.$http.get('./api/seller').then((rsp) => {
                rsp = rsp.body;
                if(rsp.errno === ERR_OK) {
                    this.seller = rsp.data;
                }
            })
        },
        components: {
            'v-header': header
        }
    }

</script>
