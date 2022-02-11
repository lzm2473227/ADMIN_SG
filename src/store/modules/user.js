import { login, logout, getInfo, findCurrentIdentityEnterpriseId } from '@/api/user'
import { getToken, setToken, removeToken, getId, setId, removeId } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
    return {
        token: getToken(),
        id: getId(),
        name: '',
        avatar: '',
        enterpriseId: "",
        deptName: "",
        registerUserId: '',
        identityDtoList: [],
        roles: []
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_NAMES: (state, id) => {
        state.id = id
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    COMPANYId: (state, id) => {
        state.enterpriseId = id
    },
    SET_DEPTNAME: (state, deptName) => {
        state.deptName = deptName
    },
    SET_RegisterUserId: (state, id) => {
        state.registerUserId = id
    },
    SET_identityDtoList: (state, list) => {
        state.identityDtoList = list
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    },
}

const actions = {
    // user login
    login({ commit }, userInfo) {
        const { username, password } = userInfo
        return new Promise((resolve, reject) => {
            login({ username: username.trim(), password: password }).then(response => {
                const { data } = response
                commit('SET_TOKEN', data.token)
                setToken(data.token, { domain: '.realbrand.net' })
                    // console.log(state.token);
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            let data = { "object": {} }
            getInfo(data).then(response => {
                const { data } = response
                // name = data.
                if (!data) {
                    return reject('Verification failed, please Login again.')
                }
                let userInfoImg = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
                commit('SET_NAME', data.userInfo.userEntity.name)
                commit('SET_RegisterUserId', data.userInfo.userEntity.id) // 注册企业时使用
                if (data.identityDtoList.length > 0) {
                    commit('SET_DEPTNAME', data.identityDtoList[0].roleDtoList[0].entity.deptName)
                    commit('SET_NAMES', data.identityDtoList[0].identityEntity.id)
                    commit('SET_identityDtoList', data.identityDtoList)
                    commit('SET_ROLES', data.identityDtoList[0].roleDtoList[0].roleResourceDto.resourceIdSet)
                    setId(data.identityDtoList[0].identityEntity.id)
                }
                commit('SET_AVATAR', userInfoImg)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    getEnterpriseId({ commit, state }) {
        return new Promise((resolve, reject) => {
            let params = {
                "object": {}
            }
            findCurrentIdentityEnterpriseId(params).then(response => {
                // console.log(state.token);
                // console.log(response);
                const { data } = response
                // name = data.
                // if (!data) {
                //     return reject('Verification failed, please Login again.')
                // }
                // console.log(state);
                // const { name, avatar,id } = data
                commit('COMPANYId', data.id)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            console.log(state)
            logout(state.token).then(() => {
                removeToken() // must remove  token  first
                removeId('SHENG_FEN')
                resetRouter()
                commit('RESET_STATE')
                commit('SET_ROLES', [])
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            removeId('SHENG_FEN')
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