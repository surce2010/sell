<template>
    <div class="shopcart">
        <div class="l-shopcart">
            <div class="logo">
                <div class="logo-icon">
                    <i class="icon-shopping_cart"></i>
                </div>
            </div>
            <div class="price">
                ¥0
            </div>
            <div class="desc">
                另需配送费¥4元
            </div>
        </div>
        <div class="r-shopcart">
            ¥20起送
        </div>
    </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
    .shopcart
        position fixed
        left 0
        bottom 0
        z-index 50
        background-color #141b27
        display flex
        width 100%
        height 46px
        .l-shopcart
            flex 1
            font-size 0
            .logo
                display inline-block
                position relative
                top -10px
                width 56px
                height 56px
                box-sizing border-box
                background-color #141b27
                margin 0 12px
                padding 6px
                border-radius 50%
                .logo-icon
                    width 100%
                    height 100%
                    background-color #2b343c
                    border-radius 50%
                    line-height 44px
                    color rgba(255, 255, 255, .4)
                    font-size 24px
                    text-align center
            .price
                display inline-block
                margin-top 12px
                padding-right 12px
                border-right 1px solid rgba(255, 255, 255, .1)
                line-height 24px
                color rgba(255, 255, 255, .4)
                font-size 16px
                font-weight 700
                vertical-align top
            .desc
                display inline-block
                margin-top 12px
                padding-left 12px
                line-height 24px
                color rgba(255, 255, 255, .4)
                font-size 16px
                vertical-align top
        .r-shopcart
            flex 0 0 105px
            width 105px
            background-color #2b333b
            line-height 46px
            color rgba(255, 255, 255, .4)
            font-size 16px
            font-weight 700
            text-align center
</style>

<script>
export default {
}
</script>
