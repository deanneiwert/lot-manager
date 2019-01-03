<template>
    <div>
        <el-carousel height="350px">
            <el-carousel-item v-for="item in 5" :key="item">
                <img :src="getPicUrl(item)" class="responsive">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>
<script>
export default {
    name: "Home",
    data () {
        return {

        };
    },
    methods: {
        getPicUrl (index) {
            return '/images/slideshow' + index + '.jpg';
        }
    }
};
</script>
<style lang="scss" scoped>
.el-carousel {
    margin: auto;
    max-width: 1024px;
}
img.responsive {
    width: 100%;
    height: auto;
}
</style>
