import auth from './auth'
import emission from './emission'
import listings from './listings'
import dashboard from './dashboard'

const rootReducer = {
    ...auth,
    ...emission,
    ...listings,
    ...dashboard
}

export default rootReducer