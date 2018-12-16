<template>
    <div class="container">
        <div>
            <h1>Login</h1>
            <el-alert
                type="error"
                title="There was an error logging in."
                :description="errors"
                v-if="error"
                show-icon
                :closable="false"
            ></el-alert>
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
        //
    },
    methods: {
        submitForm () {
            var app = this;
            this.$refs.form.validate((valid) => {
                if (valid) {
                    app.login();
                }
                return valid;
            });
        },
        login () {
            // get the redirect object
            var redirect = this.$auth.redirect()
            var app = this
            this.$auth.login({
                params: {
                    email: app.form.email,
                    password: app.form.password
                },
                success: function () {
                    app.error = false;
                    app.errors = "";
                    // handle redirection
                    const redirectTo = redirect ? redirect.from.name : this.$auth.user().role_id === 1 ? 'admin.dashboard' : 'dashboard'
                    this.$router.push({
                        name: redirectTo
                    })
                },
                error: function (resp) {
                    app.error = true;
                    app.errors = resp.response.data.error;

                    // if this was a server error, don't show error details
                    if (resp.response.status === 500) {
                        app.errors = "An unknown error occurrred (code " + resp.response.data.error.code + ")."
                    }
                },
                rememberMe: true,
                fetchUser: true
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.el-alert--error {
    margin-bottom: 10px;
}
</style>
