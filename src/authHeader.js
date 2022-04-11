function authHeader(){
    const user = JSON.parse(localStorage.getItem('accessToken'));

    if (user && user.Authorization){
        return {Authorization: user.Authorization};
    } else {
        return {};
    }
}

export default authHeader