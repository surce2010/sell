<template>
<div class="cartcontrol">
    <transition name="move">
        <span class="reduce" v-show="food.count>0" @click="reduceCart"><i class="icon-remove_circle_outline"></i></span>
    </transition>
    <span class="count" v-show="food.count>0">{{food.count}}</span>
    <span class="add" @click="addCart"><i class="icon-add_circle"></i></span>
</div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
    .cartcontrol
        .reduce
            display inline-block
            width 24px
            height 24px
            line-height 24px
            color rgb(0, 160, 220)
            font-size 24px
        .add
            display inline-block
            width 24px
            height 24px
            line-height 24px
            font-size 24px
            color rgb(0, 160, 220)
        .count
            display inline-block
            width 24px
            height 24px
            line-height 24px
            color rgb(147, 153, 159)
            font-size 10px
            vertical-align top
            text-align center
    .move-enter, .move-leave-to
        opacity 0
        transform translate3D(24px, 0, 0) rotate(180deg)
    .move-enter-active, .move-leave-active
        transition all .4s linear
</style>

<script>
export default {
    props: {
        food: {
            type: Object
        }
    },
    methods: {
        addCart: function(event) {
            if (!event._constructed) {
                return;
            };
            if (!this.food.count) {
                this.$set(this.food, 'count', 1);
            } else {
                this.food.count++;
            };
            eventBus.$emit('addBar', '传递的参数');
        },
        reduceCart: function(event) {
            if (!event._constructed) {
                return;
            };
            if (this.food.count) {
                this.food.count--;
            } else {
                this.$set(this.food, 'count', 0)
            };
        }
    }
}
</script>
