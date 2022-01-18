const UserSession = (function() {
    let user;
    const getUser = () => {
        return user;
    };

    const setUser = userInfo => {
        user = userInfo;
        setUserEmail(user.email);
    };

    const getUserEmail = () => {
        return document.cookie.split(';').find(cookie => cookie.includes('uemail'));
    };

    const setUserEmail = id => {
        document.cookie = `uemail=${id}`;
    };

    return {
        getUser: getUser,
        setUser: setUser,
        getUserEmail: getUserEmail,
        setUserEmail: setUserEmail
    }
})();

export default UserSession;