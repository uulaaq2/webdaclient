import { setSuccess, setWarning, setError } from "functions/setReply"
import { fetchOptions, baseFetch } from "functions/baseFetch"
import config from 'config'

async function getUserWithCredentials(params) {  
  try {
    const { emailAddress, password, rememberMe } = params
    const url = config.api.urls.user.signIn
    const data = {emailAddress, password, rememberMe}
    const accepts = fetchOptions.headers.accepts.json

    const getUserResult = await baseFetch('POST', url, data, accepts)

    return getUserResult
  } catch (error) {
    return setError(error)
  }
}

export default getUserWithCredentials