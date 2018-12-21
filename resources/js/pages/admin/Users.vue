<template>
    <div>
        <h1>Users</h1>
        <el-form
            ref="form"
            label-width="130px"
            @keyup.enter.native="filterChange"
            @submit.native.prevent
        >
            <el-form-item label="Filter by Name">
                <el-input v-model.trim="nameFilter" maxlength="30" @change="filterChange"></el-input>
            </el-form-item>
        </el-form>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="page"
            :page-sizes="[5, 10, 15, 20, 25]"
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper, sizes"
            :total="totalUsers"
        ></el-pagination>
        <el-table :data="users">
            <el-table-column prop="name" label="Name" sortable fixed width="200"></el-table-column>
            <el-table-column prop="email" label="Email" sortable width="400"></el-table-column>
            <el-table-column prop="role.name" label="Role" width="120" sortable></el-table-column>
            <el-table-column prop="builder.name" label="Builder" width="250" sortable></el-table-column>
            <el-table-column prop="id" label="ID" column-key="user.id" width="63" sortable></el-table-column>
        </el-table>
    </div>
</template>
<script>

export default {
    name: "Users",
    data () {
        return {
            pageSize: 15,
            nameFilter: '',
            page: 1,
        }
    },
    mounted () {
        this.getUsers()
    },
    computed: {
        usersChunk () {
            return this.$store.state.users.chunk;
        },
        users () {
            return this.usersChunk ? this.usersChunk.data : null;
        },
        totalUsers () {
            return this.usersChunk ? this.usersChunk.total : 0;
        }        
    },
    methods: {
        // clicking enter while in name filter input can cause filterChange to be called twice, so let's debounce
        filterChange: _.debounce(function () {
            this.getUsers();
        }, 500),
        handleSizeChange (val) {
            this.pageSize = val;
            this.getUsers();
        },
        handleCurrentChange (val) {
            this.page = val;
            this.getUsers();
        },
        getUsers () {
            this.$store.dispatch('users/getUsers', {
                pageSize: this.pageSize,
                nameFilter: this.nameFilter,
                page: this.page,
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.el-pagination {
    display: flex;
    flex-wrap: wrap;
    border-bottom: 1px solid #ebeef5;
    justify-content: center;
}

</style>
<style lang="scss">
.el-pagination span.el-pagination__total:not([class*=suffix]){
        display: block;
        min-width: 100%;
        font-weight: 700;
    }

</style>