<template>
    <div>
        <h1>Login</h1>
        <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-width="120px"
            :hide-required-asterisk="true"
            @keyup.enter.native="submitForm()"
        >

            <el-form-item
                label="E-mail"
                prop="email"
            >
                <el-input
                    v-model.trim="form.email"
                    type="email"
                    autofocus="true"
                    ref="email"
                ></el-input>
            </el-form-item>
            <el-form-item
                label="Password"
                prop="password"
            >
                <el-input
                    v-model="form.password"
                    type="password"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    @click="submitForm()"
                >Login</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "Login",
    data () {
        return {

            form: {
                email: null,
                password: null,
            },
            rules: {
                email: [
                    { required: true, message: 'Please input email', trigger: 'blur' },
                    { type: 'email', message: 'Please input valid email address', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: 'Please input password', trigger: 'blur' },
                ],
            },
            error: false,
            errors: null,
        }
    },
    mounted () {
        this.$refs.email.focus();
    },
    methods: {
        submitForm () {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.$store.dispatch('auth/login', this.form);
                }
                return valid;
            });
        },
    },
}
</script>
<style lang="scss" scoped>
</style>
