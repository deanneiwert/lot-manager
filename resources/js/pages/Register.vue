<template>
    <section>
        <h1>Register</h1>
        <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-width="130px"
            @keyup.enter.native="submitForm"
            @submit.native.prevent
        >
            <el-row>
                <el-col :md="12">
                    <el-form-item label="First Name" prop="firstName">
                        <el-input
                            v-model.trim="form.firstName"
                            maxlength="30"
                            autofocus="true"
                            ref="firstName"
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :md="12">
                    <el-form-item label="Last Name" prop="lastName">
                        <el-input v-model.trim="form.lastName" maxlength="30"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="E-mail" prop="email">
                        <el-input v-model.trim="form.email" type="email" maxlength="50"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :md="12">
                    <el-form-item label="Password" prop="password">
                        <el-input
                            v-model="form.password"
                            type="password"
                            minlength="6"
                            maxlength="10"
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :md="12">
                    <el-form-item label="Verify Password" prop="password_confirmation">
                        <el-input
                            v-model="form.password_confirmation"
                            type="password"
                            minlength="6"
                            maxlength="10"
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item>
                <el-button type="primary" @click="submitForm()">Register</el-button>
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
                    this.$refs.form.validateField('password_confirmation');
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
                password_confirmation: [
                    { required: true, message: 'Please verify password', trigger: 'blur' },
                    { validator: validatePass2, trigger: 'blur' },
                ],
            },
            error: '',
            errors: {},
            success: false
        }
    },
    mounted () {
        this.$refs.firstName.focus();
    },
    methods: {
        submitForm () {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.$store.dispatch('auth/register', this.form);
                }
                return valid;
            });
        },
    }
}
</script>
<style lang="scss" scoped>
</style>
