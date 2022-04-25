import auth from './auth'
import account from './account'
import emission from './emission'
import listings from './listings'
import facility from './facility'
import dashboard from './dashboard'
import users from './users'
import company from './company'

const rootReducer = {
    ...auth,
    ...account,
    ...emission,
    ...listings,
    ...facility,
    ...dashboard,
    ...users,
    ...company
}

export default rootReducer