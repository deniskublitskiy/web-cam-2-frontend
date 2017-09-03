import { combineReducers } from 'redux';

import user from './user';
import contacts from './contacts';
import auth from './auth';
import groups from './groups';
import videos from './videos';
import call from './call';
import tests from './tests';

export default combineReducers({
    auth,
    user,
    contacts,
    groups,
    videos,
    call,
    tests
});