<template>
    <div>
        <h1>Lots</h1>
        <el-form
            ref="form"
            :model="form"
            :rules="rules"
            :hide-required-asterisk="true"
            @submit.native.prevent
        >
            <el-form-item label="Filter by Builder &amp; Community" prop="builderAndCommunity">
                <el-cascader
                    :options="builders"
                    :props="props"
                    expand-trigger="hover"
                    @change="builderOrCommunityChange"
                    filterable
                    :change-on-select="true"
                    v-model="form.builderAndCommunity"
                ></el-cascader>
            </el-form-item>
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
    name: "Lots",
    components: {

    },
    data () {
        var validateCommunity = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please select builder and community'));
            } else if (value.length === 1) {
                callback(new Error('Please select community associated with builder'));
            } else {
                callback();
            }
        };
        return {
            props: {
                value: 'id',
                label: 'name',
                children: 'communities'
            },
            form: {
                builderAndCommunity: null,
            },
            rules: {
                builderAndCommunity: [
                    { validator: validateCommunity, trigger: 'change' },
                ],
            },
        }
    },
    mounted () {
        if (!this.builders || this.builders.length === 0) {
            this.getBuilders();
        }
        this.form.builderAndCommunity = [this.builderId, this.communityId];
    },
    computed: {
        ...mapState({
            builderId: state => state.builders.currentBuilderId,
            communityId: state => state.communities.currentCommunityId,
            lots: state => state.communities.lots,
        }),

        builders () {
            let builders = this.$store.state.builders.builders;
            builders = builders ? builders : [];
            return builders;
        },
    },
    methods: {
        getBuilders () {
            this.$store.dispatch('builders/getBuilders');
        },
        builderChange (value) {
            // save this builder Id in our store
            this.$store.dispatch('builders/setCurrentBuilder', value[0]);

            // get the index for the selected builder
            let builderIndex = this.builders.findIndex(b => b.id === value[0]);

            // if the builder doesn't have any communities, get the list
            if (builderIndex >= 0 && !this.builders[builderIndex].communities.length) {
                this.$store.dispatch('builders/getBuilderDetail', value[0]);
                // bug: if a builder doesn't have any communities, this will run every time that builder is hovered over
            }
        },
        builderOrCommunityChange (value) {
            // check if this was a builder or community change
            if (value.length > 1 && value[1]) {
                // community change
                this.$store.dispatch('communities/setCurrentCommunity', value[1]);
                this.$store.dispatch('communities/getLots', value[1]);
            }
            else {
                // builder change
                this.builderChange(value);
            }
        }
    },
}
</script>
<style lang="scss" scoped>
.el-cascader {
    width: 100%;
}
</style>
