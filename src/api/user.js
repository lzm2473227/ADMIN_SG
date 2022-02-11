import request from '@/utils/request'
//登入
export async function login(data) {
    return await request({
        url: '/login',
        method: 'post',
        data
    })
}
//获取当前角色
export async function getInfo(data) {
    return await request({
        url: 'org-server/User/getCurrUser',
        method: 'post',
        data
    })
}
// 获取当前身份的企业ID
export async function findCurrentIdentityEnterpriseId(data) {
    return await request({
        url: 'business-server/BusinessUser/findCurrentIdentityEnterpriseId',
        method: 'post',
        data
    })
}
// 注册
export async function registerUser(data) {
    return await request({
        url: 'business-server/BusinessUser/registerUser',
        method: 'post',
        data
    })
}

// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }