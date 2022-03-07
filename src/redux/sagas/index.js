import { all, fork } from 'redux-saga/effects'

import auth from './auth'
import emission from './emission'
import listings from './listings'

/**
 * rootSaga
 */
export default function* root() {
  yield all([
    fork(auth),
    fork(emission),
    fork(listings)
    // fork(app),
  ])
}
