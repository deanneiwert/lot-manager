<template>
    <div>
        <div>{{user.name}}</div>
        <div>{{user.role.name}}</div>
        <div>{{user.email}}</div>
        <div v-if="user.builder">{{user.builder.name}}</div>
    </div>
</template>

<script>
export default {
    name: "Profile",
    computed: {
        user() {
            return this.$store.state.auth.user;
        }
    }
}
</script>