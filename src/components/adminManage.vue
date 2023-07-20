<template>
<div>
  <div>
    <div>
      <el-button type="primary" plain>新增用户</el-button>
      <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字后按回车进行搜索"></el-input>
    </div>
    <el-table :data="tableData" stripe style="width: 100%; ">
      <el-table-column prop="id" label="ID">
      </el-table-column>
      <el-table-column prop="userAccount" label="账号" width="180">
      </el-table-column>
      <el-table-column prop="userName" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="userPhone" label="电话">
      </el-table-column>
<!--      <el-table-column prop="gender" label="性别">-->
<!--      </el-table-column>-->
      <el-table-column label="操作" width="200" style="display: flex;">
        <template slot-scope="scope">
          <el-button type="primary" plain @click="scope">编辑</el-button>
          <el-button type="danger" plain>注销</el-button>
        </template>
      </el-table-column>
    </el-table>
<!--    {{sex}}-->
  </div>
</div>
</template>

<script>
export default {
  name: "adminManage",
  methods: {
    showAllUser() {
      this.$axios.post('searchAllUser')
      .then(res => {
        this.tableData = res.data
      })
    }
  },
  mounted() {
    this.showAllUser()
  },
  data() {
    return{
      search: '',
      tableData: []
    }
  },
  // computed: {
  //   sex() {
  //     return this.tableData.gender === '1' ? '男':'女'
  //   }
  // }
}
</script>

<style scoped>

</style>