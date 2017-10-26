<template>
<div class="star-wrapper" :class="starType">
    <div v-for="itemClass in itemClassList" class="star" :class="itemClass"></div>
</div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
    .star-48
        height 19px
        text-align center
        .star
            display inline-block
            width 20px
            height 19px
            margin-right 20px
            &:last-of-type
                margin-right 0
            &.on
                bg-image('star48_on')
                background-size 20px 19px
                background-repeat no-repeat
            &.half
                bg-image('star48_half')
                background-size 20px 19px
                background-repeat no-repeat
            &.off
                bg-image('star48_off')
                background-size 20px 19px
                background-repeat no-repeat
    .star-36
        height 15px
        text-align center
        .star
            display inline-block
            width 15px
            height 15px
            margin-right 15px
            &:last-of-type
                margin-right 0
            &.on
                bg-image('star36_on')
                background-size 15px 15px
                background-repeat no-repeat
            &.half
                bg-image('star36_half')
                background-size 15px 15px
                background-repeat no-repeat
            &.off
                bg-image('star36_off')
                background-size 15px 15px
                background-repeat no-repeat
    .star-24
        height 10px
        text-align center
        .star
            display inline-block
            width 10px
            height 10px
            margin-right 10px
            &:last-of-type
                margin-right 0
            &.on
                bg-image('star24_on')
                background-size 10px 10px
                background-repeat no-repeat
            &.half
                bg-image('star24_half')
                background-size 10px 10px
                background-repeat no-repeat
            &.off
                bg-image('star24_off')
                background-size 10px 10px
                background-repeat no-repeat
</style>

<script>
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';

export default {
    props: ['size', 'score'],
    computed: {
        starType: function() {
            return 'star-' + this.size;
        },
        itemClassList: function() {
            let result = [];
            let score = Math.floor(this.score * 2) / 2;
            let hasHalf = score % 1 > 0 ? true : false;
            if (score >= 1) {
                for (var i = 1; i <= score; i++) {
                    result.push(CLS_ON);
                }
            }
            if (hasHalf) {
                result.push(CLS_HALF);
            }
            while (result.length < LENGTH) {
                result.push(CLS_OFF);
            }
            return result;
        }
    }
}
</script>
