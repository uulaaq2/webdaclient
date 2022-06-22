import { setSuccess, setWarning, setError } from "functions/setReply"
import { fetchOptions, baseFetch } from "functions/baseFetch"
import config from 'config'

async function getGroups(params) {  
  try {
    const url = config.api.urls.groups.get
    const data = {params}
    const accepts = fetchOptions.headers.accepts.json

    const getResult = await baseFetch('POST', url, data, accepts)
    
    return getResult
  } catch (error) {
    return setError(error)
  }
}

export default getGroups