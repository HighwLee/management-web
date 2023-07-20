<template>
  <div>
    <div class="registerTitle_container">
      <div id="registerTitle" class="registerTitle_box">
        <h1>注册账号</h1>
      </div>
    </div>
    <div id="userRegister" class="register_container">
      <div id="registerForm" class="register_box">
        <el-form :label-position="labelPosition" label-width="95px" :model="formLabelAlign" ref="registerForm" :rules="rules">
          <el-form-item label="账号：" prop="userAccount">
            <el-input v-model="formLabelAlign.userAccount"></el-input>
          </el-form-item>
          <el-form-item label="昵称：" prop="userName">
            <el-input v-model="formLabelAlign.userName"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="userPassword">
            <el-input v-model="formLabelAlign.userPassword" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认密码：" prop="checkPassword">
            <el-input v-model="formLabelAlign.checkPassword" show-password></el-input>
          </el-form-item>
          <el-form-item label="电话：" prop="userPhone">
            <el-input v-model="formLabelAlign.userPhone"></el-input>
          </el-form-item>
          <el-form-item label="性别：">
            <el-radio v-model="formLabelAlign.userGender" label="man">男</el-radio>
            <el-radio v-model="formLabelAlign.userGender" label="woman">女</el-radio>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "userRegister",
  data() {
    let validateAccount = (rule, value, callback) => {
      const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,8}$/
      if (value === '') {
        callback(new Error('请创建账号'))
      } else if (!pattern.test(value)) {
        callback(new Error('账号必须是由4-8位英文(含大小写)+数字组成'))
      } else {
        callback()
      }
    };
    let validateUserName = (rule, value, callback) => {
      const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/
      if (value === '') {
        callback(new Error('请创建一个昵称'))
      } else if (!pattern.test(value)) {
        callback(new Error('昵称必须是由6-12位英文(含大小写)+数字组成'))
      } else {
        callback()
      }
    };
    let validateUserPassword = (rule, value, callback) => {
      const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!pattern.test(value)) {
        callback(new Error('密码必须是由6-18位英文(含大小写)+数字组成'))
      } else {
        callback()
      }
    };
    let validateCheckPassword = (rule, value, callback) => {
      if (value === ''){
        callback(new Error('请再次输入密码'))
      }else if (value !== this.formLabelAlign.userPassword){
        callback(new Error('两次密码不一样'))
      }else {
        callback();
      }
    };
    let validateUserPhone = (rule, value, callback) => {
      const PhonePattern = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      if (value === '') {
        callback(new Error('请输入手机号码'))
      } else if (!PhonePattern.test(value)) {
        callback(new Error('请输入正确的手机号码'))
      } else {
        callback()
      }

    };
    return {
      labelPosition: 'left',
      formLabelAlign: {
        userName: '',
        userAccount: '',
        userPassword: '',
        checkPassword: '',
        userPhone: '',
        userGender: 'man'
      },
      rules: {
        userAccount: [
          {required: true, validator: validateAccount, trigger: 'blur'}
        ],
        userName: [
            {required: true ,validator: validateUserName, trigger: 'blur'}
        ],
        userPassword: [
            {required: true ,validator: validateUserPassword, trigger: 'blur'}
        ],
        checkPassword: [
            {required: true ,validator: validateCheckPassword, trigger: 'blur'}
        ],
        userPhone: [
            {required: true ,validator: validateUserPhone, trigger: 'blur'}
        ]
      }
    };
  },
  methods:{
    onSubmit(){
      let data = {
        userAccount: this.formLabelAlign.userAccount,
        userName: this.formLabelAlign.userName,
        userPassword: this.formLabelAlign.userPassword,
        userCheckPassword: this.formLabelAlign.checkPassword,
        userPhone: this.formLabelAlign.userPhone,
        userGender: this.formLabelAlign.userGender,
      }
      this.$refs.registerForm.validate((valid) => {
        if(valid){
          console.log(data)
          this.$axios.post('/register',data)
          .then( res => {
            if (res){
              this.$router.push({
                path: '/login'
              })
              .then( () => {
                this.$message({
                  message: '注册成功，已为你跳转到登录页面',
                  type: 'success'
                })
              })
            }else {
              this.$message.error('注册失败')
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
.registerTitle_container {

}
.registerTitle_box {

}
.register_container {

}
.register_box {
  width: 450px;
}
</style>