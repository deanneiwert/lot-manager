<template>
    <div>
        <h1>Communities</h1>
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
            :total="totalCommunities"
        ></el-pagination>
        <el-table ref="filterTable" :data="communities" style="width: 100%">
            <el-table-column prop="id" label="ID" column-key="user.id" width="63" sortable></el-table-column>
            <el-table-column prop="name" label="Name" sortable></el-table-column>
            <el-table-column prop="city" label="City" sortable></el-table-column>
            <el-table-column prop="state" label="State" sortable></el-table-column>
            <el-table-column prop="zip" label="Zip" sortable></el-table-column>
            <el-table-column prop="builder.name" label="Builder" width="150" sortable></el-table-column>
        </el-table>
    </div>
</template>
<script>

export default {
    name: "Communities",
    data () {
        return {
            pageSize: 15,
            nameFilter: '',
            page: 1,
        }
    },
    mounted () {
        this.getCommunities()
    },
    computed: {
        communitiesChunk () {
            return this.$store.state.communities.chunk;
        },
        communities () {
            return this.communitiesChunk ? this.communitiesChunk.data : null;
        },
        totalCommunities () {
            return this.communitiesChunk ? this.communitiesChunk.total : 0;
        }
    },
    methods: {
        // clicking enter while in name filter input can cause filterChange to be called twice, so let's debounce
        filterChange: _.debounce(function () {
            this.getCommunities();
        }, 500),
        handleSizeChange (val) {
            this.pageSize = val;
            this.getCommunities();
        },
        handleCurrentChange (val) {
            this.page = val;
            this.getCommunities();
        },
        getCommunities () {
            this.$store.dispatch('communities/getCommunities', {
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
    text-align: center;
    border-bottom: 1px solid #ebeef5;
}
</style>
