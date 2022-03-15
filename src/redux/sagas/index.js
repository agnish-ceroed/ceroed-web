import { all, fork } from 'redux-saga/effects'

import auth from './auth'
import account from './account'
import emission from './emission'
import listings from './listings'
import dashboard from './dashboard'

/**
 * rootSaga
 */
export default function* root() {
  yield all([
    fork(auth),
    fork(account),
    fork(emission),
    fork(listings),
    fork(dashboard)
    // fork(app),
  ])
}
