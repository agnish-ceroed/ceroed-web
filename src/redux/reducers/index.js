import auth from './auth'
import emission from './emission'
import listings from './listings'

export default {
    ...auth,
    ...emission,
    ...listings
}
