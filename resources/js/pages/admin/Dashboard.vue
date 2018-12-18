<template>
    <div>
        <h1>Admin Dashboard</h1>
        <Profile />
    </div>
</template>
<script>
import Profile from '../../components/Profile';
export default {
    name: "AdminDashboard",
    mounted () {
        //
    },
    components: {
        Profile
    }
}
</script>
