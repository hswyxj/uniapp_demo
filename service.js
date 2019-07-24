// 管理账号信息
const USERS_KEY = 'USERS_KEY';
const STATE_KEY = 'STATE_KEY';

const getUsers = function () {
    let ret = '';
    ret = uni.getStorageSync(USERS_KEY);
    if (!ret) {
        ret = '[]';
    }
    return JSON.parse(ret);
}

const addUser = function (userInfo) {
	console.log(userInfo)
    let users = getUsers();
    users.push({
        account: userInfo.account,
        password: userInfo.password,
		email: userInfo.email
    });
    uni.setStorageSync(USERS_KEY, JSON.stringify(users));
}

export default {
    getUsers,
    addUser
}
