<template>
    <el-row>
        <el-col :span="18">
            <el-menu
                mode="horizontal"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                :router="true"
                :default-active="activeLink"
            >
                <el-menu-item
                    index="home"
                    route="/"
                    class="logo"
                ><img
                        src="/images/logo_transparent.png"
                        ref="logo"
                    /></el-menu-item>

                <!--SALES AGENT-->
                <el-submenu
                    v-if="$auth.check()"
                    index="user"
                >
                    <template slot="title">Sales Agent</template>
                    <el-menu-item index="dashboard">Dashboard</el-menu-item>
                </el-submenu>
                <!--ADMIN or SALES MANAGER-->
                <el-submenu
                    v-if="$auth.check(1)"
                    index="admin"
                >
                    <template slot="title">Admin</template>
                    <el-menu-item
                        index="admin.dashboard"
                        route="/admin/dashboard"
                    >Dashboard</el-menu-item>
                    <el-menu-item
                        index="admin.users"
                        route="/admin/users"
                    >Users</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-col>
        <el-col :span="6">
            <el-menu
                mode="horizontal"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                :router="true"
                :default-active="activeLink2"
                class="login-nav"
            >
                <el-menu-item
                    index="login"
                    v-if="!$auth.check()"
                    route="/login"
                >Login</el-menu-item>
                <el-menu-item
                    index="register"
                    v-if="!$auth.check()"
                    route="/register"
                >Register</el-menu-item>
                <el-menu-item
                    index="logout"
                    v-if="$auth.check()"
                >
                    <a
                        href="#"
                        @click.prevent="$auth.logout()"
                    >Logout</a>
                </el-menu-item>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script>
export default {
    data () {
        return {
            activeLink: null,
            activeLink2: null,
        }
    },
    mounted () {
        //
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.activeLink = to.path
        })
    },
    beforeRouteUpdate (to, from, next) {
        this.activeLink = to.path
        next()
    },
}
</script>
<style lang="scss" scoped>
.login-nav {
    float: right;
}
.el-menu.el-menu--horizontal {
    border-bottom: 0;
    .logo img {
        width: 90px;
        margin-top: 10px;
    }
}
</style>
