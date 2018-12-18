<template>
    <div>
        <h1>Dashboard</h1>
        <Profile />
    </div>
</template>
<script>
import Profile from '../../components/Profile';
export default {
    name: "Dashboard",
    data () {
        return {
            //
        }
    },
    components: {
        Profile
    }
}
</script>
