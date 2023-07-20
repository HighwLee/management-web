<template>
  <div>
    <div class="loginTitle_container">
      <div id="loginTitle" class="loginTitle_box">
        <h1>订单管理系统</h1>
      </div>
    </div>
    <div id="userLogin" class="login_container">
      <div id="loginForm" class="login_box">
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" :rules="rules" ref="loginForm">
          <el-form-item label="账号：" prop="userAccount">
            <el-input v-model="formLabelAlign.userAccount"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="userPassword">
            <el-input v-model="formLabelAlign.userPassword" type="password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">登录</el-button>
            <el-link href="/register" class="button_position" type="primary">去注册</el-link>
<!--            <router-link to="/userRegister" class="button_position">去注册</router-link>-->
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "userLogin",
  data() {
    const validateAccount = (rule, value, callback) => {
      const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,8}$/
      if (value === '') {
        callback(new Error('请输入账号'))
      } else if (!pattern.test(value)) {
        callback(new Error('用户名必须是由4-8位英文(含大小写)+数字组成'))
      } else {
        callback()
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value === ''){
        callback(new Error('请输入密码'))
      }else {
        callback();
      }
    };
    return {
      labelPosition: 'left',
      formLabelAlign: {
        userAccount: '',
        userPassword: ''
      },
      rules: {
        userAccount: [
          {
            required: true ,validator: validateAccount, trigger: 'blur'
          }
        ],
        userPassword: [
          {
            required: true ,validator: validatePassword, trigger: 'blur'
          }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      let data = {
        userAccount: this.formLabelAlign.userAccount,
        userPassword: this.formLabelAlign.userPassword
      }
      this.$refs.loginForm.validate((valid) => {
        if (valid){
          this.$axios.post('/login',data)
          .then(res => {
            if (res.data.userAccount === data.userAccount ){
              sessionStorage.setItem('status','200')
              sessionStorage.setItem('ID',res.data.id)
              sessionStorage.setItem('userAccount',data.userAccount)
              //console.log(res.data.isAdmin)
              if (res.data.isAdmin === 1){
                this.$router.push({
                  path: '/user/admin',
                })
                .then(() => {
                  this.$message({
                    message: '登录成功',
                    type: 'success'
                  })
                })
              }else {
                this.$router.push({
                  path: '/user/home',
                }).then(() => {
                  this.$message({
                    message: '登录成功',
                    type: 'success'
                  })
                })
              }

            }else {
              this.$message.error('登录失败')
              return false;
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.loginTitle_container {
  height: 100%;
}
.loginTitle_box {
  margin-top: 6%;
  font-size: 30px;
  text-align: center;
}
.login_container {
  height: 100%;
}
.login_box {
  width: 450px;
  height: 100px;
  position: absolute;
  left: 48%;
  top: 40%;
  transform: translate(-50%,-50%);
}
.button_position {
  font-size: 14px;
  margin-left: 150px;
}
</style>