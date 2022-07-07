import { setSuccess, setWarning, setError } from "functions/setReply"
import { fetchOptions, baseFetch } from "functions/baseFetch"
import config from 'config'

async function getPermissionsWithActionsList() {  
  try {
    const url = config.api.urls.permissions.getPermissionsWithActionsList
    const data = {}
    const accepts = fetchOptions.headers.accepts.json

    return await baseFetch('POST', url, data, accepts)    
  } catch (error) {
    return setError(error)
  }
}

export default getPermissionsWithActionsList