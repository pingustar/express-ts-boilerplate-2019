const usingMockDb = (process.env.USE_MOCK_DB || '').toLowerCase();
const userDaoPath = './User/UserDao';

// tslint:disable:no-var-requires
export const { UserDao } = require(userDaoPath);
