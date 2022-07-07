import { setSuccess, setWarning, setCustom, setError } from 'functions/setReply'
import config from 'config'

export function checkMenuPermission(menuName, userInfo) { 
  console.log('abc ', userInfo)
  if (userInfo.user.Global_Admin) return true
  if (userInfo.menus.Settings?.['Site admin']?.['Admin']) return true

  return false
}

export function checkPermission(permissionName, lookFor, user) {
  if (userInfo.user.Global_Admin) return true
  if (userInfo.menus.App['Site admin']) return true

  return false
}