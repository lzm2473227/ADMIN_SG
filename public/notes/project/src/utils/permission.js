import store from '@/store'

export default function hasBtnPermission(permissionValue) {
  return store.state.user.buttons.indexOf(permissionValue) !== -1
}
