<template>
  <div>
    <div class="home_container">
      <el-container>
        <el-header class="headerBox">
          <div class="header">
            <div style="color: #ffffff">
              <el-button icon="el-icon-setting" @click="exit">退出</el-button>
<!--              {{$route.query.id}}-->
            </div>
          </div>
        </el-header>
        <el-container>
          <el-aside width="200px" class="asideBox">
            <el-menu class="el-menu-vertical-demo" default-active="4">
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
              <el-menu-item index="3" @click="clickCenter">
                <i class="el-icon-document"></i>
                <span slot="title">个人中心</span>
              </el-menu-item>
              <el-menu-item index="4">
                <template slot="title">
                  <i class="el-icon-setting"></i>
                  <span>问题反馈</span>
                </template>
              </el-menu-item>
            </el-menu>
          </el-aside>
          <el-main class="mainBox">
            <div class="empty">
              <el-empty description="4无状态"></el-empty>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
export default {
  name: "userFeedback",
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
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  },
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