<template>
  <div>
    <div class="home_container">
      <el-container>
        <el-header class="headerBox">
          <div class="header">
            <div style="color: #ffffff">
              <el-button icon="el-icon-setting" @click="exit">退出</el-button>
              {{$route.query.id}}
            </div>
          </div>
        </el-header>
        <el-container>
          <el-aside width="200px" class="asideBox">
            <el-menu class="el-menu-vertical-demo" default-active="3">
              <el-menu-item index="1" @click="clickHome">
                <template slot="title">
                  <i class="el-icon-circle-plus-outline"></i>
                  <span>订单管理</span>
                </template>
              </el-menu-item>
              <el-menu-item index="2" @click="clickRepertory">
                <i class="el-icon-menu"></i>
                <span slot="title">数据统计</span>
              </el-menu-item>
              <el-menu-item index="3">
                <i class="el-icon-document"></i>
                <span slot="title">个人中心</span>
              </el-menu-item>
              <el-menu-item index="4" @click="clickFeedback">
                <template slot="title">
                  <i class="el-icon-setting"></i>
                  <span>问题反馈</span>
                </template>
              </el-menu-item>
            </el-menu>
          </el-aside>
          <el-main class="mainBox">
<!--            <div class="empty">-->
<!--              <el-empty description="3无状态"></el-empty>-->
<!--            </div>-->

            <div class="pwForm">
              <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="当前用户为：">
                  <el-input v-model="ruleForm.userAccount" :disabled = true></el-input>
                </el-form-item>
                <el-form-item label="修改密码">
                </el-form-item>
<!--                <el-form-item label="旧密码" prop="oldPass">-->
<!--                  <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off" show-password></el-input>-->
<!--                </el-form-item>-->
                <el-form-item label="新密码" prop="newPass">
                  <el-input type="password" v-model="ruleForm.newPass" autocomplete="off" show-password></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                  <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" show-password></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitNewPass()">修改</el-button>
                  <el-button @click="resetForm()">清空</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
export default {
  name: "userWorkOrder",
  methods: {
    exit() {
      this.$router.push({
        path: '/login'
      })
          .then(() => {
            sessionStorage.setItem('status','400');
            sessionStorage.setItem('ID','false')
            sessionStorage.setItem('userAccount','null')
            this.$message.success('退出成功')
          })
    },
    clickRepertory() {
      this.$router.push({
        path: '/user/repertory'
      })
    },
    clickFeedback() {
      this.$router.push({
        path: '/user/feedback'
      })
    },
    clickHome() {
      this.$router.push({
        path: '/user/home'
      })
    },
    clickCenter(){
      this.$router.push({
        path: '/user/workOrder'
      })
    },
    submitNewPass() {
      let newData = {
        id: sessionStorage.getItem('ID'),
        newPass: this.ruleForm.newPass
      }
      this.$refs.ruleForm.validate((valid) => {
        if (valid){
          this.$axios.post('/changePass',newData)
              .then(res => {
                if (res){
                  this.$router.push({
                    path: '/login'
                  })
                      .then(() => {
                        sessionStorage.setItem('ID','false')
                        this.$message.success('你的密码已修改，请重新登录')
                      })
                }else {
                  this.$message.error('修改失败')
                }
              })
        }
      })
    },
    resetForm(){
      // this.ruleForm.oldPass = '';
      this.ruleForm.newPass = '';
      this.ruleForm.checkPass = '';
    }
    // handleEdit(index, row) {
    //   console.log(index, row);
    // },
    // handleDelete(index, row) {
    //   console.log(index, row);
    // }
  },
  data() {
    // let validateOldPass = (rule, value,callback) => {
    //   const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/
    //   if (value === '') {
    //     callback(new Error('请输入旧密码'))
    //   } else if (!pattern.test(value)) {
    //     callback(new Error('密码必须是由6-18位英文(含大小写)+数字组成'))
    //   } else {
    //     callback()
    //   }
    // };
    let validateNewPass = (rule, value,callback) => {
      const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else if (!pattern.test(value)) {
        callback(new Error('密码必须是由6-18位英文(含大小写)+数字组成'))
      } else {
        callback()
      }
    };
    let validateCheckPass = (rule, value, callback) => {
      if (value === ''){
        callback(new Error('请再次输入密码'))
      }else if (value !== this.ruleForm.newPass){
        callback(new Error('两次密码不一样'))
      }else {
        callback();
      }
    };
    return {
      ruleForm: {
        userAccount: sessionStorage.getItem('userAccount'),
        newPass: '',
        checkPass: ''
      },
      rules: {
        newPass: [
          {required: true, validator: validateNewPass, trigger: 'blur'}
        ],
        checkPass: [
          {required: true, validator: validateCheckPass, trigger: 'blur'}
        ]
      }
    }
  }
}
</script>

<style scoped>
.home_container {
  width: 100%;
  height: 100%;
}
.headerBox {
  position: relative;
  width: 100%;
  height: 60px !important;
  background-color: #112965;
}
.header {
  margin-left: 80%;
  transform: translate(0%,25%);
}
.asideBox {
  position: absolute;
  height: 91%;
}
.mainBox {
  position: relative;
  margin-left: 200px;
  height: 620px;
}
.pwForm {
  width: 30%;
}
.empty {
  width: 100%;
}
.tableBox {
  font-size: 10px;
  line-height: 20px;
}
.buttonContainer {
  position: relative;
  background-color: #ffffff;
}
/*.buttonBox {*/
/*  transform: translate(50%, -500%);*/
/*  height: 50px;*/
/*}*/
.el-header {
  padding: 0;
}
.el-aside {
  /*display: flex;*/
  background-color: #fdfcfc;
  color: #333;
  text-align: center;
  /*line-height: 580px;*/
}

.el-main {
  background-color: #efefef;
  color: #333;
  text-align: center;
}

</style>

<style>
* { /* CSS Reset */
  margin: 0;
  padding: 0;
}

body {
  width: 100%;
  height: 100%;
}

html {
  width: 100%;
  height: 100%;
}

#app {
  width: 100%;
  height: 100%;
}
</style>