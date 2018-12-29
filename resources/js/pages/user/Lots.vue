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
            <el-table-column prop="lot_status.name" label="Status" width="300" sortable>
                <template slot-scope="scope">
                    <div v-show="scope.row.id === editLot.id">
                        <el-select
                            v-model="editLot.lot_status"
                            value-key="id"
                            @change="statusChange"
                        >
                            <el-option
                                v-for="lotStatus in lotStatuses"
                                :key="lotStatus.id"
                                :label="lotStatus.name"
                                :value="lotStatus"
                            ></el-option>
                        </el-select>
                    </div>
                    <div v-show="scope.row.id != editLot.id">{{scope.row.lot_status.name}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="id" label="ID" sortable column-key="id" width="63"></el-table-column>
            <el-table-column fixed="right" width="150">
                <template slot-scope="scope">
                    <div v-show="scope.row.id === editLot.id">
                        <el-button
                            type="success"
                            icon="el-icon-check"
                            @click="saveEditClick(scope.row)"
                            circle
                        ></el-button>
                        <el-button
                            type="danger"
                            @click="cancelEditClick"
                            icon="el-icon-close"
                            circle
                        ></el-button>
                    </div>
                    <div v-show="scope.row.id != editLot.id">
                        <el-button
                            @click="editClick(scope.row)"
                            type="primary"
                            icon="el-icon-edit"
                            circle
                        ></el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'Lots',
    data () {
        return {
            editLot: {},
        };
    },
    mounted () {
        // if the user only has one community, set the drop down to that community
        if (this.assignments.length === 1) {
            this.setCommunity(this.assignments[0].community);
        }

        // if the lot statuses haven't been loaded, load them
        if (!this.lotStatuses) {
            this.$store.dispatch('lotStatuses/getLotStatuses');
        }
    },
    computed: {
        ...mapState({
            assignments: state => state.auth.user.community_assignment,
            community: state => state.communities.currentCommunity,
            lots: state => state.communities.lots,
            lotStatuses: state => state.lotStatuses.lotStatuses,
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
        editClick (lot) {
            this.editLot = Object.assign({}, lot);
        },
        cancelEditClick () {
            this.editLot = {};
        },
        statusChange (status) {
            // the object each lot is bound to has both lot_status_id and lot_status.id,
            // we have to update lot_status_id since the status drop down is only bound to lot_status
            this.editLot.lot_status_id = status.id;
        },
        saveEditClick (lot) {
            // update the primary model object based off the object that was edited
            Object.assign(lot, this.editLot);

            // save change to database
            this.$store.dispatch('communities/saveLot', lot);

            // reset edit lot
            this.editLot = {};
        },
    }
}
</script>
<style lang="scss" scoped>
.el-select {
    width: 100%;
}
</style>
