import auth from './auth'
import account from './account'
import emission from './emission'
import listings from './listings'
import facility from './facility'
import dashboard from './dashboard'
import users from './users'

const rootReducer = {
    ...auth,
    ...account,
    ...emission,
    ...listings,
    ...facility,
    ...dashboard,
    ...users
}

export default rootReducer