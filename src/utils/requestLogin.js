import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken, getId, removeId } from '@/utils/auth'

// create an axios instance
const service1 = axios.create({
    baseURL: process.env.VUE_APP_LOGIN_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})

// request interceptor
service1.interceptors.request.use(
    config => {
        // config.headers['Region'] = 'FJ'
        config.headers['Region'] = 'SG'
            // do something before request is sent
            // console.log(store.getters);
        if (store.getters.token) {
            // console.log(store.getters.token)
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            // config.headers['Authorization'] = 'Bearer ' + getToken()
        }
        return config
    },
    error => {
        // do something with request error
        // console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service1.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        const res = response.data

        // console.log(response)
        // if the custom code is not 20000, it is judged as an error.
        if (res.code !== 'SUCCESS') {
            Message({
                    message: res.msg || 'Error',
                    type: 'error',
                    duration: 3 * 1000
                })
                // METHOD_ARGUMENT_NOT_VALID_EXCEPTION 查不到企业id，没有完善企业信息返回的状态
                // IDENTITY_NOT_FOUND 身份未找到
            if (res.code === 'ENTERPRISE_NOT_FOUND' || res.code === 'EXISTS_MULTIPLE_IDENTITIES' || res.code === 'METHOD_ARGUMENT_NOT_VALID_EXCEPTION' || res.code === 'IDENTITY_NOT_FOUND') {
                store.dispatch('user/resetToken').then(() => {
                    location.reload()
                })
                removeId('SHENG_FEN')
                return res
            }

            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                // to re-login
                MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
                    confirmButtonText: 'Re-Login',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('user/resetToken').then(() => {
                        location.reload()
                    })
                })
            }
            // console.log(res)
            return res
                // return Promise.reject(new Error(res.msg || 'Error'))
        } else {
            // if (res.code === 'ENTERPRISE_NOT_FOUND') {
            //     return Promise.reject(new Error())
            // }
            // console.log(store.state.user.identityDtoList.length === 0)
            // if (typeof(store.state.user.id) == 'undefined') {
            //     store.dispatch('user/resetToken')
            // }
            return res
        }
    },
    error => {
        console.log('err' + error) // for debug
        Message({
            message: error.msg,
            type: 'error',
            duration: 3 * 1000
        })
        return Promise.reject(error)
    }
)

export default service1