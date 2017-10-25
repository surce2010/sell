<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menu">
            <ul>
                <li v-for="(item, index) in goods" class="menu-item" :class="{current: currentIndex === index}" @click="scrollMenu(index, $event)">
                    <span class="text">
                        <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foods">
            <ul>
                <li v-for="item in goods" class="food-list food-list-hook">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li v-for="food in item.foods" class="food-item">
                            <div class="icon">
                                <img :src="food.icon">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">¥{{food.price}}</span><span v-show="food.oldPrice" class="old">¥{{food.oldPrice}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <v-shopcart></v-shopcart>
    </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
    .goods
        position absolute
        top 174px
        bottom 46px
        display flex
        width 100%
        overflow hidden
        .menu-wrapper
            flex 0 0 80px
            width 80px
            background-color #f3f5f7
            .menu-item
                display table
                width 56px
                height 54px
                padding 0 12px
                line-height 14px
                &.current
                    position relative
                    z-index 10
                    margin-top -1px
                    background-color #fff
                    font-weight 700
                    .text
                        border-none()
                .icon
                    display inline-block
                    width 12px
                    height 12px
                    vertical-align top
                    background-size 12px 12px
                    background-repeat no-repeat
                    &.decrease
                        bg-image('decrease_3')
                    &.discount
                        bg-image('discount_3')
                    &.guarantee
                        bg-image('guarantee_3')
                    &.invoice
                        bg-image('invoice_3')
                    &.special
                        bg-image('special_3')
                .text
                    display table-cell
                    width 56px
                    border-1px(rgba(7, 17, 27, 0.1))
                    vertical-align middle
                    font-size 12px
        .foods-wrapper
            flex 1
            background-color #fff
            .title
                height 26px
                padding-left 14px
                border-left 2px solid #d9dde1
                background-color #f3f5f7
                line-height 26px
                color rgb(147, 153, 159)
                font-size 12px
            .food-item
                display flex
                padding 18px
                border-1px(rgba(7, 17, 27, 0.1))
                &:last-child
                    border-top none
                .icon
                    flex 0 0 57px
                    width 57px
                    margin-right 10px
                    img
                        display block
                        width 57px
                        height 57px
                .content
                    flex 1
                    .name
                        margin 2px 0 8px
                        height 14px
                        line-height 14px
                        font-size 14px
                        color rgb(7, 17, 27)
                    .desc
                        margin-bottom 8px
                        line-height 12px
                        font-size 10px
                        color rgb(147, 153, 159)
                    .extra
                        line-height 10px
                        font-size 10px
                        color rgb(147, 153, 159)
                        .count
                            margin-right 12px
                    .price
                        line-height 24px
                        font-weight 700
                        .now
                            margin-right 8px
                            color rgb(240, 20, 20)
                            font-size 14px
                        .old
                            color rab(147, 153, 159)
                            font-size 10px
</style>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';
    import shopcart from 'components/shopcart/';

    var ERR_OK = 0;
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data() {
            return {
                goods: [],
                listHeight: [],
                scrollY: 0
            }
        },
        created() {
            this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
            this.$http.get('/api/goods').then((res) => {
                res = res.body;
                if (res.errno === ERR_OK) {
                    this.goods = res.data;
                    this.$nextTick(() => {
                        this._initScroll();
                        this._clacHeight();
                    });
                }
            })
        },
        computed: {
            currentIndex() {
                for (let i=0; i<this.listHeight.length; i++) {
                    let height1 = this.listHeight[i];
                    let height2 = this.listHeight[i+1];
                    if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                        return i;
                    }
                }
                return 0;
            }
        },
        methods: {
            scrollMenu(index, event) {
                if (!event._constructed) {
                    return;
                }
                let foodsList = this.$el.getElementsByClassName('food-list-hook');
                let el = foodsList[index];
                this.foodsScroll.scrollToElement(el, 300);
            },
            _initScroll() {
                this.menuScroll = new BScroll(this.$refs.menu, {
                    click: true // 启用click事件
                });
                this.foodsScroll = new BScroll(this.$refs.foods, {
                    probeType: 3 // 实时派发scroll事件
                });
                this.foodsScroll.on('scroll', (pos) => {
                    this.scrollY = Math.abs(Math.round(pos.y));
                });
            },
            _clacHeight() {
                let foodsList = this.$el.getElementsByClassName('food-list-hook');
                let height = 0;
                this.listHeight.push(height);
                for (let i=0; i<foodsList.length; i++) {
                    let item = foodsList[i];
                    height += item.clientHeight;
                    this.listHeight.push(height);
                }
            }
        },
        components: {
            'v-shopcart': shopcart
        }
    };
</script>
