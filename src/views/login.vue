<template>
    <div class="login content-center">
        <div class="login-logo">
        </div>
        <el-row class="login-box">
            <el-col>
                <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
                    <el-form-item prop="loginName">
                        <span class="icon account"></span>
                        <el-input placeholder="请输入用户名" v-model="loginForm.loginName"
                                  @keyup.native.enter="submitLoginForm('loginForm')">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <span class="icon password"></span>
                        <el-input placeholder="请输入密码" type="password" v-model="loginForm.password"
                                  @keyup.native.enter="submitLoginForm('loginForm')">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-model="loginForm.keepPass">记住密码</el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary login-button" @click="submitLoginForm('loginForm')">
                            登录
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import loginApi from 'api/loginApi'

    export default {
        data() {
            console.log(_WEBSOCKET)
            const user = this.$storage.getUser();
            return {
                loginForm: user.keepPass?user:{loginName:user.loginName},
                loginRules: {
                    loginName: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            submitLoginForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        loginApi.login(this.loginForm).then((response) => {
                            this.$storage.setUser(this.loginForm)
                            response.resultData.sortedMenus = loginApi.reSortMenus(response.resultData.menus);
                            this.$storage.setItem(this.$storage.KEY_USER_DETAIL, response.resultData);
                            window._UUID = response.resultData.uuid
                            this.$router.push({path: 'home'});
                        })
                    } else {
                        return false;
                    }
                });
            }
        }

    }
</script>
<style lang="less">
    .login {
        width: 100%;
        height: 100%;
        background: url("~assets/image/login/login_bg.png") no-repeat center;
        background-size: cover;
        .login-logo {
            position: absolute;
            top: 40px;
            left: 40px;
            height: 36px;
            width: 251px;
            background: url("~assets/image/login/login_logo.png") no-repeat center;
            background-size: cover;

        }
        .login-box {
            height: 394px;
            width: 350px;
            padding: 138px 30px 30px 30px;
            background: url("~assets/image/login/login_user.png") no-repeat center;
            background-size: cover;
            .login-button {
                width: 100%;
            }
            input {
                height: 44px;
                padding-left: 44px;
                line-height: 44px;
            }
            .icon {
                height: 19px;
                width: 19px;
                background-size: cover;
                position: absolute;
                background-size: cover;
                z-index: 99;
                top: 13px;
                left: 13px;
            }
            .account {
                background: url("~assets/image/login/login_account.png") no-repeat center;

            }
            .password {
                background: url("~assets/image/login/login_password.png") no-repeat center;
            }
        }
    }
</style>