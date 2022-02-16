<template>
  <el-card class="container">
    <el-table
      :data="permissionList"
      row-key="id"
      border
      :expand-row-keys="['1']"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="name" label="名称" sortable width="180" />
      <el-table-column prop="code" label="权限值" sortable width="180" />
      <el-table-column prop="toCode" label="跳转权限值" />
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-plus"
            :disabled="row.level === 4"
            @click="showDialog(row)"
            v-if="$hasBP('btn.Permission.add')"
          />
          <el-button
            type="warning"
            size="mini"
            icon="el-icon-edit"
            v-if="$hasBP('btn.Permission.update')"
          />
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            v-if="$hasBP('btn.Permission.remove')"
          />
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="title" :visible.sync="visible">
      <!-- body -->
      <el-form label-width="110px">
        <el-form-item label="父级名称" v-if="permission.level !== 1">
          <el-input v-model="permission.name" disabled />
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="editingPermission.name" />
        </el-form-item>
        <el-form-item label="功能权限值">
          <el-input v-model="editingPermission.code" />
        </el-form-item>
        <el-form-item label="跳转路由权限值" v-if="permission.level === 3">
          <el-input v-model="editingPermission.toCode" />
        </el-form-item>
      </el-form>
      <!-- footer -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="addPermission">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  name: 'Permission',
  data() {
    return {
      permissionList: [],
      visible: false,
      permission: {}, // 当前点击的这个菜单
      editingPermission: {
        // 正在添加的权限菜单
        name: '',
        code: '',
        toCode: ''
      }
    }
  },
  mounted() {
    this.getAllPermission()
  },
  methods: {
    async getAllPermission() {
      const res = await this.$API.permission.reqGetAllPermission()
      this.permissionList = res.children
    },
    showDialog(row) {
      this.permission = row
      this.visible = true
    },
    async addPermission() {
      const { level, id } = this.permission
      const { name, code, toCode } = this.editingPermission
      await this.$API.permission.reqSavePermission({
        // children: [{}],
        code,
        level: level + 1,
        name,
        pid: id, // 父级菜单的id
        toCode
      })
      this.$message({
        type: 'success',
        message: '添加菜单成功'
      })
      this.editingPermission = {
        name: '',
        code: '',
        toCode: ''
      }
      this.visible = false
      this.getAllPermission()
    }
  },
  computed: {
    title() {
      const { level } = this.permission
      let title = '添加'
      switch (level) {
        case 1:
          title += `一级菜单`
          break
        case 2:
          title += `二级菜单`
          break
        case 3:
          title += `功能`
          break
      }
      return title
    }
  }
}
</script>

<style></style>
