<template>
<div class="header">
    <div class="content-wrapper">
        <div class="avatar">
            <img width="64" height="64" :src="seller.avatar">
        </div>
        <div class="content">
            <div class="title">
                <span class="brand"></span>
                <span class="name">{{seller.name}}</span>
            </div>
            <div class="description">
                {{seller.description}}/{{seller.deliveryTime}}分钟到达
            </div>
            <div class="support" v-if="seller.supports">
                <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                <span class="text">{{seller.supports[0].description}}</span>
            </div>
        </div>
        <div class="support-count" v-if="seller.supports" @click="showDetail">
            <span class="count">{{seller.supports.length}}个</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
        <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
        <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background-avatar">
        <img width="100%" height="100%" :src="seller.avatar">
    </div>
    <transition name="fade">
        <div class="detail-wrapper" v-show="detailIsShow">
            <div class="detail-content">
                <h1 class="name">{{seller.name}}</h1>
                <star :size="48" :score="seller.score" class="star-wrapper"></star>
                <div class="subtitle">
                    <span class="line"></span>
                    <span class="title">优惠信息</span>
                    <span class="line"></span>
                </div>
                <div class="support">
                    <div class="support-item" v-for="item in seller.supports">
                        <span class="icon" :class="classMap[item.type]"></span>
                        <span class="text">{{item.description}}</span>
                    </div>
                </div>
                <div class="subtitle">
                    <span class="line"></span>
                    <span class="title">商家公告</span>
                    <span class="line"></span>
                </div>
                <div class="bulletin">{{seller.bulletin}}</div>
            </div>
            <div class="close">
                <i class="icon-close" @click="hideDetail"></i>
            </div>
        </div>
    </transition>
</div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
    .header
        position relative
        background-color rgba(7, 17, 27, 0.5)
        overflow hidden
        .content-wrapper
            position relative
            padding 24px 12px 18px 24px
            font-size 0
            .avatar
                display inline-block
                width 64px
                height 64px
                vertical-align top
                img
                    border-radius 2px
            .content
                display inline-block
                margin-top 2px
                margin-left 16px
                .title
                    margin-bottom 8px
                    .brand
                        display inline-block
                        width 30px
                        height 18px
                        vertical-align top
                        bg-image('brand')
                        background-size 30px 18px
                        background-repeat no-repeat
                    .name
                        margin-left 6px
                        line-height 18px
                        color #fff
                        font-size 16px
                        font-weight bold
                .description
                    margin-bottom 10px
                    line-height 12px
                    color #fff
                    font-size 12px
                    font-weight 200
                .support
                    .icon
                        display inline-block
                        width 12px
                        height 12px
                        vertical-align top
                        background-size 12px 12px
                        background-repeat no-repeat
                        &.decrease
                            bg-image('decrease_1')
                        &.discount
                            bg-image('discount_1')
                        &.guarantee
                            bg-image('guarantee_1')
                        &.invoice
                            bg-image('invoice_1')
                        &.special
                            bg-image('special_1')
                    .text
                        margin-left 4px
                        line-height 12px
                        color #fff
                        font-size 10px
                        font-weight 200
            .support-count
                position absolute
                right 12px
                bottom 18px
                height 24px
                padding 0 8px
                line-height 24px
                border-radius 14px
                background-color rgba(0, 0, 0, 0.2)
                color #fff
                font-size 0
                font-weight 200
                .count
                    display inline-block
                    vertical-align top
                    font-size 10px
                .icon-keyboard_arrow_right
                    margin-left 2px
                    line-height 24px
                    font-size 10px
        .bulletin-wrapper
            position relative
            height 28px
            line-height 28px
            padding 0 20px 0 12px
            background-color rgba(7, 17, 27, 0.2)
            color #fff
            font-size 10px
            font-weight 200
            white-space nowrap
            text-overflow ellipsis
            overflow hidden
            .bulletin-title
                display inline-block
                width 22px
                height 12px
                margin-top 8px
                vertical-align top
                bg-image('bulletin')
                background-size 22px 12px
                background-repeat no-repeat
            .bulletin-text
                margin-left 4px
            .icon-keyboard_arrow_right
                position absolute
                top 8px
                right 12px
                font-size 10px
        .background-avatar
            position absolute
            top 0
            left 0
            z-index -1
            width 100%
            height 100%
            filter blur(10px)
        .detail-wrapper
            position fixed
            top 0
            left 0
            z-index 100
            width 100%
            height 100%
            background-color rgba(7, 17, 27, 0.8)
            overflow auto
            .detail-content
                min-height calc(100% - 96px)
                margin-bottom 96px
                .name
                    height 32px
                    padding-top 64px
                    line-height 32px
                    color rgb(255, 255, 255)
                    font-size 16px
                    font-weight 700
                    text-align center
                .star-wrapper
                    margin-top 16px
                .subtitle
                    display flex
                    height 14px
                    margin-top 28px
                    padding 0 36px
                    line-height 14px
                    align-items center
                    .line
                        flex 1
                        height 1px
                        background-color rgba(255, 255, 255, 0.2)
                    .title
                        padding 0 12px
                        color rgb(255, 255, 255)
                        font-size 14px
                        font-weight 700
                .support
                    margin-top 24px
                    padding 0 48px
                    .support-item
                        height 16px
                        margin-bottom 12px
                        line-height 16px
                        color #fff
                        font-size 10px
                        font-weight 200
                        white-space nowrap
                        text-overflow ellipsis
                        overflow hidden
                        &:last-of-type
                            margin-bottom 0
                        .icon
                            display inline-block
                            width 16px
                            height 16px
                            vertical-align top
                            background-size 16px 16px
                            background-repeat no-repeat
                            &.decrease
                                bg-image('decrease_2')
                            &.discount
                                bg-image('discount_2')
                            &.guarantee
                                bg-image('guarantee_2')
                            &.invoice
                                bg-image('invoice_2')
                            &.special
                                bg-image('special_2')
                        .text
                            margin-left 6px
                            line-height 12px
                .bulletin
                    margin-top 24px
                    padding 0 48px
                    line-height 24px
                    color #fff
                    font-size 12px
                    font-weight 200
            .close
                display block
                width 32px
                height 32px
                margin -64px auto
                .icon-close
                    color rgba(255, 255, 255, 0.5)
                    font-size 32px
    .fade-enter-active, .fade-leave-active
        transition opacity .5s
    .fade-enter, .fade-leave-to
        opacity 0
</style>

<script>
import star from 'components/star/'

export default {
    props: {
        seller: {
            type: Object
        }
    },
    data: function() {
        return {
            detailIsShow: false
        }
    },
    methods: {
        showDetail: function() {
            this.detailIsShow = true;
        },
        hideDetail: function() {
            this.detailIsShow = false;
        }
    },
    created() {
        this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    },
    components: {
        star
    }
}
</script>
