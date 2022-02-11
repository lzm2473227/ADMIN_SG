import Cookies from 'js-cookie'

const TokenKey = 'KAI_HUA_ADMIN_TOKEN'
const IdKey = 'SHENG_FEN'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token, domain) {
    // return Cookies.set(TokenKey, token, domain)
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    // return Cookies.remove(TokenKey, { domain: '.realbrand.net' })
    return Cookies.remove(TokenKey)
}
export function getId() {
    return Cookies.get(IdKey)
}

export function setId(id) {
    return Cookies.set(IdKey, id)
}

export function removeId() {
    return Cookies.remove(IdKey)
}