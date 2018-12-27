<template>
    <div>
        <h1>Lots</h1>
        <el-form ref="form" label-width="200px" @submit.native.prevent>
            <el-form-item label="Filter by Community" prop="community">
                <el-select v-model="community.id" placeholder="Select" change="setCommunityById">
                    <el-option
                        v-for="assignment in assignments"
                        :key="assignment.community.id"
                        :label="assignment.community.name"
                        :value="assignment.community.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <div v-show="communitySelected">
                <el-form-item label="Community Location: ">
                    <div>{{community.street_address}}</div>
                    <div>{{community.city}}, {{community.state}} {{community.zip}}</div>
                </el-form-item>
            </div>
        </el-form>
        <el-table :data="lots">
            <el-table-column prop="lot_number" label="Lot Number" sortable width="120" fixed></el-table-column>
            <el-table-column prop="street_address" label="Address" width="400" sortable></el-table-column>
            <el-table-column prop="lot_status.name" label="Status" width="400" sortable></el-table-column>
            <el-table-column prop="id" label="ID" sortable column-key="id" width="63"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'Lots',
    data () {
        return {

        };
    },
    mounted () {
        // if the user only has one community, set the drop down to that community
        if (this.assignments.length === 1) {
            this.setCommunity(this.assignments[0].community);
        }
    },
    computed: {
        ...mapState({
            assignments: state => state.auth.user.community_assignment,
            community: state => state.communities.currentCommunity,
            lots: state => state.communities.lots,
        }),
        communitySelected () {
            return !_.isEmpty(this.community);
        }
    },
    methods: {
        setCommunityById (value) {
            this.$store.dispatch('communities/setCurrentCommunityById', value);
            this.$store.dispatch('communities/getLots', value);
        },
        setCommunity (value) {
            this.$store.dispatch('communities/setCurrentCommunity', value);
            this.$store.dispatch('communities/getLots', value.id);
        },
    }
}
</script>
<style lang="scss" scoped>
.el-select {
    width: 100%;
}
</style>
