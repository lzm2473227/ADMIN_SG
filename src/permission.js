import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/internalManage/companyInfo/companyDetailInfo', '/internalManage/companyInfo/ReleasedCompanyDetailInfo'] // 不需要token的白名单

router.beforeEach(async(to, from, next) => {
    // start progress bar
    NProgress.start()

    // set page title
    document.title = getPageTitle(to.meta.title)

    // determine whether the user has logged in
    const hasToken = getToken()

    if (hasToken) {
        if (to.path === '/login') {
            // if is logged in, redirect to the home page
            next({ path: '/' })
            NProgress.done()
        } else {
            // const hasGetUserInfo = store.getters.identityDtoList
            // const hasGetUserInfo = store.getters.name
            // if (hasGetUserInfo) {
            //     next()
            const hasRoles = store.getters.roles && store.getters.roles.length > 0
            if (hasRoles) {
                next()
            } else {
                try {
                    // get user info
                    // await store.dispatch('user/getInfo')
                    // await store.dispatch('user/getEnterpriseId')
                    // next()
                    let res = await store.dispatch('user/getInfo')
                    let roles = res.identityDtoList[0].roleDtoList[0].roleResourceDto.resourceIdSet // 异步获取用户的角色
                    const accessRoutes = await store.dispatch('permission/generateRoutes', roles) // 根据用户角色，动态生成路由
                    router.addRoutes(accessRoutes) // 调用 router.addRoutes 动态添加路由

                    if (res.identityDtoList.length > 0) { // 有企业信息的条件下，获取企业id
                        await store.dispatch('user/getEnterpriseId')
                        next({...to, replace: true }) // 使用 replace 访问路由，不会在 history 中留下记录
                            // next()
                    }
                    // if (res.identityDtoList.length === 0) { // 判断用户是否完善企业信息
                    //     next({ path: '/internalManage/companyInfo/companyDetailInfo' })
                    // }
                } catch (error) {
                    console.log(error)
                        // remove token and go to login page to re-login

                    await store.dispatch('user/resetToken')

                    // Message.error(error || 'Has Error')
                    next('/internalManage/companyInfo/companyDetailInfo')
                        // next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
            }
        }
    } else {
        /* has no token*/

        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next()
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})