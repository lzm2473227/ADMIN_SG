import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
// 校验用户是否具有进入该路由权限
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        // 判断 route.meta.roles 中是否包含用户角色 roles 中的任何一个权限，如果包含则返回 true，否则为 false
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        // 如果路由没有 meta 或 meta.roles 属性，则视为该路由不需要进行权限控制，所有用户对该路由都具有访问权限
        return true
    }
}

/**
 * Filter asynchronous routing tables by recursion
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRoutes
 * @param roles
 */
// 递归过滤 asyncRoutes 路由中的 roles 可进入的路由
export function filterAsyncRoutes(routes, roles) {
    const res = []

    routes.forEach(route => {
        // 对路由进行浅拷贝，注意 children 不会拷贝，因为不需要对 children 进行判断，所以可以使用浅拷贝
        const tmp = {...route }
        if (hasPermission(roles, tmp)) { // 检查用户角色是否具备访问路由的权限
            // 当路由具有访问权限时，判断路由是否具备 children 属性
            if (tmp.children) {
                // 当路由包含 children 时，对 children 迭代调用 filterAsyncRoutes 方法
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
            res.push(tmp)
        }
    })

    return res
}

const state = {
    routes: [],
    addRoutes: []
}

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes
        state.routes = constantRoutes.concat(routes) // 将 routes 集成到 src/router/index.js 的 constantRoutes 中
    }
}

const actions = {
    generateRoutes({ commit }, roles) {
        return new Promise(resolve => {
            // 定义一个变量，用来存放可以访问的路由表
            let accessedRoutes
                // 判断当前用户是否包含admin
            if (roles.includes('admin')) {
                // 如果角色中包含 admin，则直接跳过判断，直接将 asyncRoutes 全部返回
                accessedRoutes = asyncRoutes || []
            } else {
                // 否则根据角色过滤掉不能访问的路由表
                accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
            }
            commit('SET_ROUTES', accessedRoutes)
            resolve(accessedRoutes)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}