<template>
    <el-menu
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router="true"
        :default-active="activeLink"
    >
        <el-menu-item index="home" route="/" class="logo">
            <img src="/images/logo_transparent.png" ref="logo">
        </el-menu-item>

        <!--SALES AGENT-->
        <el-submenu v-if="roleCheck(2)" index="user">
            <template slot="title">Sales Agent</template>
            <el-menu-item index="dashboard">Dashboard</el-menu-item>
            <el-menu-item index="lots" route="/lots">Lots</el-menu-item>
        </el-submenu>
        <!--ADMIN -->
        <el-submenu v-if="roleCheck(1)" index="admin">
            <template slot="title">Admin</template>
            <el-menu-item index="admin.dashboard" route="/admin/dashboard">Dashboard</el-menu-item>
            <el-menu-item index="admin.users" route="/admin/users">Users</el-menu-item>
            <el-menu-item index="admin.communities" route="/admin/communities">Communities</el-menu-item>
            <el-menu-item index="admin.lot-statuses" route="/admin/lot-statuses">Lot Status</el-menu-item>
            <el-menu-item index="admin.lots" route="/admin/lots">Lots</el-menu-item>
        </el-submenu>
        <!-- AUTH -->
        <el-menu-item class="auth-nav" index="login" v-if="!user" route="/login">Login</el-menu-item>
        <el-menu-item class="auth-nav" index="register" v-if="!user" route="/register">Register</el-menu-item>
        <el-menu-item class="auth-nav" index="logout" v-if="user" @click="logout">Logout</el-menu-item>
    </el-menu>
</template>

<script>
export default {
    data () {
        return {
            activeLink: null,
        }
    },
    mounted () {
        //
    },
    methods: {
        logout () {
            this.$store.dispatch('auth/logout')
                .then(() => this.$router.push('/'))
                .catch(err => console.log(err));
        },
        roleCheck (roleId) {
            return this.user && this.user.role_id === roleId;
        },
    },
    computed: {
        user () {
            return this.$store.state.auth.user;
        },
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
.user-name {
    color: #fff;
    vertical-align: middle;
}
.auth-nav {
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
