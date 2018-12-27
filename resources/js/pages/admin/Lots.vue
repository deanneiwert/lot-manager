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
                    @change="builderOrCommunityChange"
                    filterable
                    :change-on-select="true"
                    v-model="form.builderAndCommunity"
                ></el-cascader>
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
        // see if we need to retrieve builders
        if (!this.builders || this.builders.length === 0) {
            this.getBuilders();
        }

        // check if current builder doesn't match current community
        if (this.community && this.builder && this.community.builder_id != this.builder.id) {
            // unset current community
            this.$store.dispatch('communities/unsetCurrentCommunity');
            this.$store.dispatch('communities/unsetLots');
        }

        // set default builder and community selection
        this.form.builderAndCommunity = [this.builder.id, this.community.id];
    },
    computed: {
        ...mapState({
            builder: state => state.builders.currentBuilder,
            community: state => state.communities.currentCommunity,
            lots: state => state.communities.lots,
        }),
        builders () {
            let builders = this.$store.state.builders.builders;
            builders = builders ? builders : [];
            return builders;
        },
        communitySelected () {
            return !_.isEmpty(this.community);
        }
    },
    methods: {
        getBuilders () {
            this.$store.dispatch('builders/getBuilders');
        },
        builderChange (value) {
            // get the index for the selected builder
            let builderIndex = this.builders.findIndex(b => b.id === value[0]);

            // if the builder doesn't have any communities, get the list
            if (builderIndex >= 0 && !this.builders[builderIndex].communities.length) {
                this.$store.dispatch('builders/getBuilderDetail', value[0]);
            }

            // save this builder in our store)
            this.$store.dispatch('builders/setCurrentBuilderById', value[0]);
        },
        builderOrCommunityChange (value) {
            // check if this was a builder or community change
            if (value.length > 1 && value[1]) {
                // community change
                this.$store.dispatch('communities/setCurrentCommunityById', value[1]);
                this.$store.dispatch('communities/getLots', value[1]);
            }
            else {
                // builder change
                this.builderChange(value);
            }
        },
    },
}
</script>
<style lang="scss" scoped>
.el-cascader {
    width: 100%;
}
</style>
