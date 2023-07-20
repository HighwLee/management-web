<template>
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
            <el-menu class="el-menu-vertical-demo" default-active="1">
              <el-menu-item index="1">
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
              <el-menu-item index="4" @click="clickFeedback">
                <i class="el-icon-setting"></i>
                <span slot="title">问题反馈</span>
              </el-menu-item>
            </el-menu>
          </el-aside>
          <el-dialog
              title="新建订单"
              :visible.sync = "dialogVisible"
              width="30%">
            <el-form ref="form" :model="addForm" label-width="80px">
              <el-form-item label="商品名称">
                <el-input v-model="addForm.equipmentName"></el-input>
              </el-form-item>
              <el-form-item label="商家名称">
                <el-input v-model="addForm.supplyName"></el-input>
              </el-form-item>
              <el-form-item label="数量">
                <el-input v-model="addForm.counts"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="addOrder">立即创建</el-button>
                <el-button @click="dialogVisible = false">取消</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
          <el-dialog
              title="编辑订单"
              :visible.sync = "EditdialogVisible"
              width="30%">
            <el-form ref="form" :model="editForm" label-width="80px">
              <el-form-item label="订单ID">
                <el-input v-model="editForm.id" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="商品名称">
                <el-input v-model="editForm.equipmentName"></el-input>
              </el-form-item>
              <el-form-item label="商家名称">
                <el-input v-model="editForm.supplyName"></el-input>
              </el-form-item>
              <el-form-item label="数量">
                <el-input v-model="editForm.counts"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="editOrder();EditdialogVisible = false">立即修改</el-button>
                <el-button @click="EditdialogVisible = false">取消</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
          <el-main class="mainBox">
            <el-header class="buttonContainer">
              <div class="buttonBox">
                <el-button type="primary" icon="el-icon-plus" round class="buttonAdd" @click="dialogVisible = true">增加订单</el-button>
                <el-button type="danger" icon="el-icon-delete" round class="button" @click="deleteAll">删除全部</el-button>
              </div>
            </el-header>
            <el-table :data="tableData" height="580" class="tableBox">
<!--              <el-table-column-->
<!--                  type="selection"-->
<!--                  width="55">-->
<!--              </el-table-column>-->
              <el-table-column prop="id" label="订单ID" width="140">
              </el-table-column>
              <el-table-column prop="equipmentName" label="商品名称" width="120">
              </el-table-column>
              <el-table-column prop="supplyName" label="商家名称">
              </el-table-column>
              <el-table-column prop="counts" label="数量">
              </el-table-column>
              <el-table-column align="right">
                <template slot="header" slot-scope="scope">
                  <el-input
                      v-model="search"
                      size="mini"
                      @keyup.enter.native="searchOrder(scope)"
                      placeholder="输入关键字后按回车进行搜索"></el-input>
                </template>
                <template slot-scope="scope">
                  <el-button
                      size="mini"
                      @click="EditdialogVisible = true;handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-main>
        </el-container>
      </el-container>
  </div>
</template>

<script>
export default {
  name: "userHome",
  methods: {
    resetAddForm(){
      this.addForm.equipmentName=''
      this.addForm.supplyName=''
      this.addForm.counts=''
    },
    showAll() {
      let belongData = {
        //跟数据库要同名
        belongWho : sessionStorage.getItem('userAccount')
      }
      this.$axios.post('/searchAll',belongData)
      .then( res => {
        this.tableData = res.data
      })
    },
    addOrder() {
      let data = {
        equipmentName: this.addForm.equipmentName,
        supplyName: this.addForm.supplyName,
        counts: this.addForm.counts,
        belongWho: sessionStorage.getItem('userAccount')
      }
      this.$axios.post('/addOrder',data)
      .then( res => {
        if (res){
          this.$message.success('添加成功')
        }else {
          this.$message.error('添加失败')
        }
      })
      .then(() => {
        this.resetAddForm()
        this.showAll()
      })
    },
    editOrder() {
      let data = {
        id: this.editForm.id,
        equipmentName: this.editForm.equipmentName,
        supplyName: this.editForm.supplyName,
        counts: this.editForm.counts
      }
      this.$axios.post('/editOne',data)
      .then( res => {
        if (res){
          this.$message.success('修改成功')
        }else {
          this.$message.error('修改失败')
        }
      })
      .then( ()=> {
        this.showAll()
      })
    },
    deleteAll() {
      let dataWho = {
        id: sessionStorage.getItem('ID'),
        belongWho: sessionStorage.getItem('userAccount')
      }
      this.$confirm('此操作将永久删除订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then( res => {
        this.$axios.delete('/deleteAll',{data:dataWho})
        if (res){
          this.$message.success('删除成功')
        }else {
          this.$message.error('删除失败')
        }
      }).then(() => {
        this.showAll()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    searchOrder() {
      let searchData = {
        searchColumn: this.search,
        belongWho : sessionStorage.getItem('userAccount')
      }
      this.$axios.post('/searchByEntity',searchData)
          .then( res => {
          this.tableData = res.data
      })
    },
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
    handleEdit(index, row) {
      this.editForm = {
        id: row.id,
        equipmentName: row.equipmentName,
        supplyName: row.supplyName,
        counts: row.counts
      }
    },
    handleDelete(index, row) {
      let deleteId = {
        id: row.id,
        belongWho: sessionStorage.getItem('userAccount')
      }
      this.$confirm('此操作将永久删除订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then( res => {
        this.$axios.delete('/deleteOne',{data:deleteId})
        if (res){
          this.$message.success('删除成功')
        }else {
          this.$message.error('删除失败')
        }
      }).then(() => {
        this.showAll()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  },
  mounted() {
    this.showAll()
  },
  data() {
    return {
      dialogVisible: false,
      EditdialogVisible: false,
      addForm: {
        equipmentName: '',
        supplyName: '',
        counts: ''
      },
      editForm: {},
      tableData: [],
      search: ''
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
.tableBox {
  font-size: 10px;
  line-height: 20px;
}
.buttonContainer {
  position: relative;
  background-color: #ffffff;
}
.buttonBox {
  /*transform: translate(50%, -500%);*/
  position: relative;
  height: 100%;
  width: 100%;
}
.buttonAdd {
  transform: translate(300%,25%);
  position: absolute;
}
.button {
  transform: translate(400%,25%);
  position: absolute;
}
.el-header {
  position: relative;
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
  line-height: 620px;
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