import requestLogin from '@/utils/requestLogin'

// 个人登录
export async function login(data) {
    return await requestLogin({
        url: '/login',
        method: 'post',
        data
    })
}

// 个人注册
export async function registerUser(data) {
    return await requestLogin({
        url: '/consumer-user-server/User/registerUser',
        method: 'post',
        data
    })
}