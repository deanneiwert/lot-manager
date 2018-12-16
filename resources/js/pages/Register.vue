<template>
    <section>
        <h1>Register</h1>
        <el-alert
            type="error"
            title="There was an error, unable to complete registration."
            :description="errors"
            v-if="error && !success"
            show-icon
            :closable="false"
        ></el-alert>
        <el-alert
            type="success"
            title="Registration complete."
            v-if="success"
            show-icon
            :closable="false"
        >
            <div>You can now <router-link :to="{name:'login'}">sign in.</router-link>
            </div>
        </el-alert>
        <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-width="130px"
            @keyup.enter.native="submitForm"
            @submit.native.prevent
        >
            <el-row>
                <el-col :span="12">
                    <el-form-item
                        label="First Name"
                        prop="firstName"
                    >
                        <el-input
                            v-model.trim="form.firstName"
                            maxlength="30"
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item
                        label="Last Name"
                        prop="lastName"
                    >
                        <el-input
                            v-model.trim="form.lastName"
                            maxlength="30"
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item
                        label="E-mail"
                        prop="email"
                    >
                        <el-input
                            v-model.trim="form.email"
                            type="email"
                            maxlength="50"
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item
                        label="Password"
                        prop="password"
                    >
                        <el-input
                            v-model="form.password"
                            type="password"
                            minlength="6"
                            maxlength="10"
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item
                        label="Verify Password"
                        prop="passwordVerify"
                    >
                        <el-input
                            v-model="form.passwordVerify"
                            type="password"
                            minlength="6"
                            maxlength="10"
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item>
                <el-button
                    type="primary"
                    @click="submitForm()"
                >Register</el-button>
            </el-form-item>
        </el-form>
    </section>
</template>

<script>
export default {
    data () {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please input the password'));
            } else {
                if (this.form.passwordVerify != null) {
                    this.$refs.form.validateField('passwordVerify');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please input the password again'));
            } else if (value !== this.form.password) {
                callback(new Error('Two inputs don\'t match!'));
            } else {
                callback();
            }
        };
        return {
            form: {
                firstName: null,
                lastName: null,
                email: null,
                password: null,
                passwordVerify: null,
            },

            rules: {
                firstName: [
                    { required: true, message: 'Please input first name', trigger: 'blur' },
                ],
                lastName: [
                    { required: true, message: 'Please input last name', trigger: 'blur' },
                ],
                email: [
                    { required: true, message: 'Please input email', trigger: 'blur' },
                    { type: 'email', message: 'Please input valid email address', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: 'Please input password', trigger: 'blur' },
                    { min: 6, max: 10, message: 'Please enter password between 6 and 10 characters', trigger: 'blur' },
                    { validator: validatePass, trigger: 'blur' },
                ],
                passwordVerify: [
                    { required: true, message: 'Please verify password', trigger: 'blur' },
                    { validator: validatePass2, trigger: 'blur' },
                ],
            },
            error: '',
            errors: {},
            success: false
        }
    },
    methods: {
        submitForm () {
            var app = this;
            app.$refs.form.validate((valid) => {
                if (valid) {
                    app.register();
                }
                else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        register () {
            var app = this
            this.$auth.register({
                data: {
                    name: app.form.firstName + ' ' + app.form.lastName,
                    email: app.form.email,
                    password: app.form.password,
                    password_confirmation: app.form.passwordVerify
                },
                success: function () {
                    app.success = true
                },
                error: function (resp) {
                    app.error = true;
                    let errors = "";
                    if (resp.response.data.errors) {
                        if (resp.response.data.errors.name) {
                            errors = resp.response.data.errors.name
                        }
                        if (resp.response.data.errors.email) {
                            errors += ' ' + resp.response.data.errors.email
                        }
                        app.errors = errors.trim();
                    }

                    // if this was a server error, don't show error details
                    if (resp.response.status === 500) {
                        app.errors = "An unknown error occurrred (code " + resp.response.data.error.code + ")."
                    }
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.el-alert--error,
.el-alert--success {
    margin-bottom: 10px;
}
</style>
