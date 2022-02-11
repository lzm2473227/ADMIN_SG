import request from '@/utils/request'

// 组织列表
export async function queryList_Org(data) {
    return await request({
        url: '/org-server/Org/queryList',
        method: 'post',
        data
    })
}
// 组织列表
export async function queryDtoList_Org(data) {
    return await request({
        url: '/org-server/Org/queryDtoList',
        method: 'post',
        data
    })
}
// 删除组织列表
export async function batchDelete_Org(data) {
    return await request({
        url: '/org-server/Org/batchDelete',
        method: 'post',
        data
    })
}
// 获取所有组织树
export async function findAllOrgTree_Org(data) {
    return await request({
        url: '/org-server/Org/findAllOrgTree',
        method: 'post',
        data
    })
}
// 根据 ID 查找组织
export async function findById_Org(data) {
    return await request({
        url: '/org-server/Org/findById',
        method: 'post',
        data
    })
}
// 新增组织
export async function create_Org(data) {
    return await request({
        url: '/org-server/Org/create',
        method: 'post',
        data
    })
}
// 修改组织
export async function update_Org(data) {
    return await request({
        url: '/org-server/Org/update',
        method: 'post',
        data
    })
}

// 部门列表
export async function queryList_Dept(data) {
    return await request({
        url: '/org-server/Dept/queryList',
        method: 'post',
        data
    })
}
// 删除部门
export async function batchDelete_Dept(data) {
    return await request({
        url: '/org-server/Dept/batchDelete',
        method: 'post',
        data
    })
}
// 根据 ID 查找部门
export async function findById_Dept(data) {
    return await request({
        url: '/org-server/Dept/findById',
        method: 'post',
        data
    })
}
// 新增部门
export async function create_Dept(data) {
    return await request({
        url: '/org-server/Dept/create',
        method: 'post',
        data
    })
}
// 修改部门
export async function update_Dept(data) {
    return await request({
        url: '/org-server/Dept/update',
        method: 'post',
        data
    })
}

// 岗位列表
export async function findRoleList_Role(data) {
    return await request({
        url: '/org-server/Role/findRoleList',
        method: 'post',
        data
    })
}
// 删除岗位
export async function batchDelete_Role(data) {
    return await request({
        url: '/org-server/Role/batchDelete',
        method: 'post',
        data
    })
}
// 新增岗位
export async function createRole_Role(data) {
    return await request({
        url: '/org-server/Role/createRole',
        method: 'post',
        data
    })
}
// 修改岗位
export async function updateRole_Role(data) {
    return await request({
        url: '/org-server/Role/updateRole',
        method: 'post',
        data
    })
}

// 获取所有资源树
export async function loadAllResourceTree_Resource(data) {
    return await request({
        url: '/org-server/Resource/loadAllResourceTree',
        method: 'post',
        data
    })
}

// 获取指定范围数据
export async function loadAllGroupTree_Group(data) {
    return await request({
        url: '/org-server/Group/loadAllGroupTree',
        method: 'post',
        data
    })
}

// 根据 ID 查找岗位
export async function findRoleById_Role(data) {
    return await request({
        url: '/org-server/Role/findRoleById',
        method: 'post',
        data
    })
}
// 分配岗位
export async function userAddRole_Identity(data) {
    return await request({
        url: '/org-server/Identity/userAddRole',
        method: 'post',
        data
    })
}

// 新增职员
export async function createUser_User(data) {
    return await request({
        url: '/org-server/User/createUser',
        method: 'post',
        data
    })
}
// 修改职员
export async function updateUser_User(data) {
    return await request({
        url: '/org-server/User/updateUser',
        method: 'post',
        data
    })
}


// 职员列表
export async function queryList_User(data) {
    return await request({
        url: '/org-server/User/queryList',
        method: 'post',
        data
    })
}
// 根据 id 获取用户信息
export async function findUserById_User(data) {
    return await request({
        url: '/org-server/User/findUserById',
        method: 'post',
        data
    })
}