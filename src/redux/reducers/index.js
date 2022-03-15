import auth from './auth'
import account from './account'
import emission from './emission'
import listings from './listings'
import dashboard from './dashboard'

const rootReducer = {
    ...auth,
    ...account,
    ...emission,
    ...listings,
    ...dashboard
}

export default rootReducer