import request from '@/utils/request'

export default {
  // 根据角色获取权限列表
  reqGetRolePermission(roleId) {
    return request({
      method: 'GET',
      url: `/admin/acl/permission/toAssign/${roleId}`
    })
  },
  // 给角色分配权限列表
  reqAssignRolePermission(roleId, permissionId) {
    return request({
      method: 'POST',
      url: `/admin/acl/permission/doAssign`,
      params: {
        roleId,
        permissionId
      }
    })
  },
  // 获取所有菜单
  reqGetAllPermission() {
    return request({
      method: 'GET',
      url: `/admin/acl/permission`
    })
  },
  // 添加菜单
  reqSavePermission(data) {
    return request({
      method: 'POST',
      url: `/admin/acl/permission/save`,
      data
    })
  }
}
