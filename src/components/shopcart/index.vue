<template>
<div>
    <div class="shopcart">
        <div class="l-shopcart">
            <div class="logo">
                <div class="logo-icon" :class="{'highlight': totalCount>0}">
                    <i class="icon-shopping_cart"></i>
                </div>
                <span class="num" v-show="totalCount>0">{{totalCount}}</span>
            </div>
            <div class="price" :class="{'highlight': totalPrice>0}">
                ¥{{totalPrice}}
            </div>
            <div class="deliveryPrice">
                另需配送费¥{{deliveryPrice}}元
            </div>
        </div>
        <div class="r-shopcart" :class="{'enough': this.totalPrice>=this.minPrice}">
            {{payDesc}}
        </div>
        <div class="ball-wrap">
            <transition-group tag="div" name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
                <div v-for="(ball, index) in balls" v-show="ball.show" :key="index" class="ball"></div>
            </transition-group>
        </div>
    </div>
    <!-- <div class="mask"></div> -->
    <div class="cart-wrap">
        <div class="cart-header">
            <h1 class="title">购物车</h1>
            <span class="empty">清空</span>
        </div>
        <div class="cart-list">
            <div v-for="food in selectFoods" class="cart-item">
                <span class="name">{{food.name}}</span>
                <span class="price"><i class="unit">¥</i>{{food.price * food.count}}</span>
                <v-cartcontrol :food="food"></v-cartcontrol>
            </div>
        </div>
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
                    &.highlight
                        background-color rgb(0, 160, 220)
                        color #fff
                .num
                    position absolute
                    top 0
                    right 0
                    width 24px
                    height 16px
                    background-color rgb(240, 20, 20)
                    border-radius 16px
                    box-shadow 0 4px 8px 0 rgba(0, 0, 0, .4)
                    line-height 16px
                    color #fff
                    font-size 10px
                    font-weight 700
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
                &.highlight
                    color #fff
            .deliveryPrice
                display inline-block
                margin-top 12px
                padding-left 12px
                line-height 24px
                color rgba(255, 255, 255, .4)
                font-size 10px
                vertical-align top
        .r-shopcart
            flex 0 0 100px
            width 100px
            background-color #2b333b
            line-height 46px
            color rgba(255, 255, 255, .4)
            font-size 12px
            font-weight 700
            text-align center
            &.enough
                background-color #00b43c
                color #fff
        .ball-wrap
            .ball
                position fixed
                left 32px
                bottom 22px
                z-index 200
                width 16px
                height 16px
                background-color rgb(0, 160, 220)
                border-radius 50%
    .mask
        position fixed
        top 0
        left 0
        width 100%
        height 100%
        background-color rgba(7, 17, 27, 0.6)
    .cart-wrap
        position fixed
        left 0
        bottom 46px
        z-index 40
        width 100%
        max-height 260px
        background-color #fff
        overflow hidden
        .cart-header
            position relative
            height 40px
            padding 0 18px
            line-height 40px
            background-color #f3f5f7
            border-1px(rgba(7, 17, 27, 0.1))
            .title
                color rgb(7, 17, 27)
                font-size 14px
                font-weight 200
            .empty
                position absolute
                top 0
                right 18px
                color rgb(0, 160, 220)
                font-size 12px
        .cart-list
            padding 0 18px
            .cart-item
                position relative
                height 48px
                box-sizing border-box
                padding 12px 0
                line-height 24px
                border-1px(rgba(7, 17, 27, 0.1))
                .name
                    color rgb(7, 17, 27)
                    font-size 14px
                .price
                    position absolute
                    right 92px
                    top 12px
                    color rgb(240, 20, 20)
                    font-size 14px
                    .unit
                        font-style normal
                        font-size 10px
                .cartcontrol
                    position absolute
                    right 0
                    top 12px
                    height 24px
</style>

<script>
import Velocity from 'velocity-animate';
import cartcontrol from 'components/cartcontrol/';

export default {
    created: function() {
        eventBus.$on('addBar', (target) => {
            this.drop(target);
        });
    },
    props: {
        selectFoods: {
            type: Array,
            default: function() {
                return [];
            }
        },
        deliveryPrice: {
            type: Number,
            default: 0
        },
        minPrice: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            balls: [{
                show: false
            }, {
                show: false
            }, {
                show: false
            }, {
                show: false
            }, {
                show: false
            }],
            dropBalls: []
        }
    },
    computed: {
        totalPrice() {
            let total = 0;
            this.selectFoods.forEach((food) => {
                total += food.price * food.count;
            });
            return total;
        },
        totalCount() {
            let count = 0;
            this.selectFoods.forEach((food) => {
                count += food.count;
            });
            return count;
        },
        payDesc() {
            if (this.totalPrice === 0) {
                return `¥${this.minPrice}起送`
            } else if (this.totalPrice < this.minPrice) {
                return `还差¥${this.minPrice - this.totalPrice}元`
            } else {
                return '去结算'
            }
        }
    },
    methods: {
        drop: function(target) {
            for (var i = 0; i < this.balls.length; i++) {
                let ball = this.balls[i];
                if (!ball.show) {
                    let rect = target.getBoundingClientRect();
                    ball.x = rect.left - 32;
                    ball.y = -(window.innerHeight - rect.top - 22);
                    ball.show = true;
                    this.dropBalls.push(ball);
                    return;
                };
            };
        },
        beforeEnter: function(el) {
            for (var i = 0; i < this.balls.length; i++) {
                let ball = this.balls[i];
                if (ball.show) {
                    Velocity(el, {
                        translateX: ball.x + 'px',
                        translateY: ball.y + 'px',
                        opacity: 0
                    }, {
                        duration: 0
                    });
                }
            }
        },
        enter: function(el, done) {
            Velocity(el, {
                translateX: 0,
                translateY: 0,
                opacity: 1
            }, {
                complete: done,
                duration: 600,
                easing: 'easeInSine'
            })
        },
        afterEnter(el) {
            let ball = this.dropBalls.shift();
            if (ball) {
                ball.show = false;
                Velocity(el, {
                    translateX: 0,
                    translateY: 0,
                    opacity: 0
                }, {
                    duration: 0
                });
            };
        }
    },
    components: {
        'v-cartcontrol': cartcontrol
    }
}
</script>
