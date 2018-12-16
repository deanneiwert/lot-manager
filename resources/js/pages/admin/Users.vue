<template>
    <div>
        <h1>Users</h1>
        <el-alert
            type="error"
            title="Error, could not get the list of users"
            :description="errors"
            v-if="has_error"
            show-icon
            :closable="false"
        ></el-alert>
        <!--
        <el-button @click="resetDateFilter">reset date filter</el-button>
        <el-button @click="clearFilter">reset all filters</el-button>
        -->
        <el-form
            ref="form"
            label-width="130px"
            @keyup.enter.native="filterChange"
            @submit.native.prevent
        >
            <el-form-item label="Filter by Name">
                <el-input
                    v-model.trim="nameFilter"
                    maxlength="30"
                    @change="filterChange"
                ></el-input>
            </el-form-item>
        </el-form>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="[5, 10, 15, 20, 25]"
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper, sizes"
            :total="totalUsers"
        >

        </el-pagination>
        <el-table
            ref="filterTable"
            :data="users"
            style="width: 100%"
        >
            <el-table-column
                prop="id"
                label="ID"
                column-key="user.id"
                width="63"
                sortable
            >
            </el-table-column>
            <el-table-column
                prop="name"
                label="Name"
                sortable
            >
            </el-table-column>
            <el-table-column
                prop="email"
                label="Email"
                sortable
            >
            </el-table-column>
            <el-table-column
                prop="role.name"
                label="Role"
                width="120"
                sortable
            >
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import _ from 'lodash'
export default {
    name: "Users",
    data () {
        return {
            has_error: false,
            usersData: null,
            pageSize: 15,
            nameFilter: '',
            currentPage: 1,
            errors: null,
        }
    },
    mounted () {
        this.getUsers()
    },
    computed: {
        users () {
            return this.usersData ? this.usersData.data : null;
        },
        totalUsers () {
            return this.usersData ? this.usersData.total : 0;
        }
    },
    methods: {
        // clicking enter while in name filter input can cause filterChange to be called twice, so let's debounce
        filterChange: _.debounce(function () {
            this.getUsers();
        }, 500),
        resetDateFilter () {
            this.$refs.filterTable.clearFilter('date');
        },
        clearFilter () {
            this.$refs.filterTable.clearFilter();
        },
        formatter (row, column) {
            return row.address;
        },
        filterTag (value, row) {
            return row.tag === value;
        },
        filterHandler (value, row, column) {
            const property = column['property'];
            return row[property] === value;
        },
        handleSizeChange (val) {
            this.pageSize = val;
            this.getUsers();
        },
        handleCurrentChange (val) {
            this.currentPage = val;
            this.getUsers();
        },
        getUsers () {
            var app = this;
            app.$http({
                url: `users/${app.pageSize}/${app.nameFilter}`,
                method: 'GET',
                params: { page: app.currentPage },
            })
                .then((res) => {
                    app.usersData = res.data.users
                }, (res) => {
                    app.has_error = true
                    app.errors = res.response.data.error;

                    // if this was a server error, don't show error details
                    if (res.response.status === 500) {
                        app.errors = "An unknown error occurrred (code " + res.response.data.error.code + ")."
                    }
                })
        }
    }
}
</script>
<style lang="scss" scoped>
.el-pagination {
    text-align: center;
    border-bottom: 1px solid #ebeef5;
}
</style>
