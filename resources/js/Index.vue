<template>
    <section class="el-container is-vertical">
        <header class="el-header">
            <nav>
                <navigationMenu></navigationMenu>
            </nav>
        </header>
        <main class="el-main">
            <router-view></router-view>
        </main>
    </section>
</template>
<script>
import navigationMenu from './components/Menu.vue'
export default {
    data () {
        return {
            //
        }
    },
    components: {
        navigationMenu
    }
}
</script>

<style lang="scss">
@import "resources/sass/app.scss";
nav,
main {
    max-width: 1100px;
    margin: auto;
    h1 {
        margin: 30px 0;
    }
}

header {
    background-color: $gray;
    .login-nav {
        float: right;
    }
    .el-menu.el-menu--horizontal {
        border-bottom: 0;
        background-color: $orange;
    }
}

main {
    width: 100%;
    background-color: #fff;
    border-radius: 0px 0px 12px 12px;
    margin-bottom: 50px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.3);
}
</style>
