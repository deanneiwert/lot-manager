<template>
    <div>
        <h1>Lot Statuses</h1>
        <el-form
            ref="form"
            label-width="130px"
        >
            <el-form-item label="Filter by Builder">
                <el-select :value="builderId" filterable placeholder="Select Builder" class="builders" @change="builderChange">
                    <el-option
                        v-for="builder in builders"
                        :key="builder.id"
                        :label="builder.name"
                        :value="builder.id">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <el-row>
            <el-col :span="2">
                &nbsp;
            </el-col>
            <el-col :span="4">
                <div class="grid-content"><strong>Order</strong></div>
            </el-col>
            <el-col :span="18">
                <div class="grid-content"><strong>Lot Status</strong></div>
            </el-col>
        </el-row>
        <div v-show="!lotStatuses" class="no-data">
            No data
        </div>
        <draggable v-model="lotStatuses" :options="{handle:'.drag-handle'}">
            <el-row type="flex" v-for="status in lotStatuses" :key="status.id">
                <el-col :span="2">
                    <img src="/images/drag-handle.png" class="drag-handle" />
                </el-col>
                <el-col :span="4">
                    {{status.order}}
                </el-col>
                <el-col :span="18">
                    {{status.name}}
                </el-col>
            </el-row>
        </draggable>
    </div>
</template>

<script>
import draggable from 'vuedraggable';
import { mapState } from 'vuex';

export default {
    name: "LotStatuses",
    components: {
        draggable,
    },
    data() {
        return {
            
        }
    },
    mounted() {
        this.getBuilders();
    },
    computed: {
        ...mapState({
            builderId: state => state.lotStatuses.builderId
        }),
        builders() {
            return this.$store.state.builders.builders;
        },
        lotStatuses: {
            get() {
                return this.$store.state.lotStatuses.lotStatuses;
            },
            set(value){
                this.$store.dispatch('lotStatuses/setLotStatuses', value);
            }
        }
    },
    methods: {
        getBuilders() {
            this.$store.dispatch('builders/getBuilders');
        },
        getLotStatuses() {
            this.$store.dispatch('lotStatuses/getLotStatuses');
        },
        builderChange(value) {
            this.$store.dispatch('lotStatuses/setBuilder', value);
            this.getLotStatuses();
        },
    },
}
</script>
<style lang="scss" scoped>
.builders{
    width: 100%;
}
.el-row{
    border-bottom: 1px solid #ebeef5;
    align-items: center;
}

.grid-content{
    min-height: 36px;
} 

.drag-handle{
    width: 36px;
}
.no-data{
    padding: 30px;
    text-align: center;
    min-height: 36px;
}
.sortable-drag{
    background-color: yellow;
}
</style>