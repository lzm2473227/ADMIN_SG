import cloneDeep from 'lodash/cloneDeep'
import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter, asyncRoutes, constantRoutes } from '@/router'

const filterAsyncRoutes = (asyncRoutes, routes) => {
  return asyncRoutes.filter(asyncRoute => {
    // 判断路由表中的名称在不在用户权限值列表中
    // console.log(routes, asyncRoute.name)
    if (routes.indexOf(asyncRoute.name) !== -1) {
      // 如果在，说明用户拥有权限，保留

      // 还可能有子路由，还需对子路由做处理
      if (asyncRoute.children && asyncRoute.children.length) {
        asyncRoute.children = filterAsyncRoutes(asyncRoute.children, routes)
      }

      return true
    }

    // 不在，说明用户没有权限，过滤
    return false
  })
}

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // SET_NAME: (state, name) => {
  //   state.name = name
  // },
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar = avatar
  // }
  SET_USER_INFO(state, user) {
    // 用户名
    state.name = user.name
    // 用户头像
    state.avatar = user.avatar
    // 按钮权限列表
    state.buttons = user.buttons
  },
  SET_ROUTES(state, routes) {
    // routes里面没有首页
    const asyncRoutes = constantRoutes.concat(routes)
    // 保存起来，为了生成侧边栏
    state.routes = asyncRoutes
    // 添加路由配置
    // 默认情况下，路由只加载 constantRoutes 的配置，也就说只能访问登录页面和首页
    // 要想访问其他页面需要追加路由配置
    router.addRoutes(routes)
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login(username, password)
        .then(response => {
          commit('SET_TOKEN', response.token)
          setToken(response.token)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then(response => {
          if (!response) {
            return reject('Verification failed, please Login again.')
          }
          // 保存用户数据
          commit('SET_USER_INFO', response)

          // 生成权限菜单
          // 所有权限菜单 asyncRoutes 和 当前用户拥有的权限值列表 response.routes
          // 对 所有权限菜单 进行过滤，最终得到用户可以访问权限菜单列表
          const routes = filterAsyncRoutes(
            cloneDeep(asyncRoutes),
            response.routes
          )
          commit('SET_ROUTES', routes)

          // console.log(routes)

          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          removeToken() // must remove  token  first
          resetRouter()
          commit('RESET_STATE')
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
