<template>
  <el-card class="container">
    <el-form>
      <el-form-item>
        <el-input :value="$route.query.roleName" disabled />
      </el-form-item>
      <el-form-item>
        <el-tree
          ref="tree"
          :data="permissionList"
          show-checkbox
          node-key="id"
          default-expand-all
          :default-checked-keys="rolePermissionIds"
          :props="defaultProps"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button
          @click="
            $router.push({
              name: 'Role'
            })
          "
        >
          取消
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'RoleAuth',
  data() {
    return {
      permissionList: [], // 所有菜单
      rolePermissionIds: [], // 当前角色拥有的菜单id
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  async mounted() {
    const [
      rolePermissionListRes,
      permissionListRes
    ] = await Promise.allSettled([
      this.$API.permission.reqGetRolePermission(this.$route.params.roleId),
      this.$API.permission.reqGetAllPermission()
    ])

    if (rolePermissionListRes.status === 'fulfilled') {
      // 获取所有id
      this.getRolePermissionIds(rolePermissionListRes.value.children)
    } else {
      this.$message({
        type: 'error',
        message: '获取当前角色拥有的菜单数据失败'
      })
    }

    if (permissionListRes.status === 'fulfilled') {
      this.permissionList = permissionListRes.value.children
    } else {
      this.$message({
        type: 'error',
        message: '获取所有菜单数据失败'
      })
    }
  },
  methods: {
    // 获取角色权限id
    getRolePermissionIds(rolePermissionList) {
      rolePermissionList.forEach(rolePermission => {
        // 判断是否选中
        if (rolePermission.select) {
          this.rolePermissionIds.push(rolePermission.id)
        }

        if (rolePermission.children && rolePermission.children.length) {
          this.getRolePermissionIds(rolePermission.children)
        }
      })
    },
    async submit() {
      // 半选中的按钮
      const halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys()
      // 所有选中的按钮（包含半选中）
      const checkedKeys = this.$refs.tree.getCheckedKeys()

      // 所有选中的按钮要过滤掉半选中的
      const permissionId = checkedKeys.filter(
        key => halfCheckedKeys.indexOf(key) === -1
      )
      await this.$API.permission.reqAssignRolePermission(
        this.$route.params.roleId,
        permissionId.join(',')
      )
      this.$message({
        type: 'success',
        message: '分配角色权限成功'
      })
      this.$router.push({
        name: 'Role'
      })
    }
  }
}
</script>

<style></style>
