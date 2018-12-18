<template>
    <section class="el-container is-vertical">
        <header class="el-header">
            <nav>
                <navigationMenu></navigationMenu>
            </nav>
        </header>
        <main class="el-main">
            <el-alert
                :type="alert.type"
                :title="alert.message"
                v-if="alert.message"
                show-icon
                :closable="false"
            ></el-alert>
            <router-view></router-view>
        </main>
    </section>
</template>
<script>
import navigationMenu from './components/Menu.vue'
export default {
    name: "Index",
    data () {
        return {
            //
        }
    },
    components: {
        navigationMenu
    },
    computed: {
        alert () {
            return this.$store.state.alert
        }
    },
    watch: {
        $route (to, from) {
            // clear alert on location change
            this.$store.dispatch('alert/clear');
        }
    }
}
</script>

<style lang="scss">
@import "resources/sass/app.scss";
nav,
main {
    max-width: 1100px;
    margin: auto;
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

main.el-main {
    width: 100%;
    background-color: #fff;
    border-radius: 0px 0px 12px 12px;
    margin-bottom: 50px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.3);
    padding-top: 50px;
    h1 {
        margin-bottom: 30px;
    }
}
</style>
