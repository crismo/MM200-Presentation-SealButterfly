const tokenGenerator = async (id, username) => {

    let tokenKey = "";

    for(let i = 0; i < 15; i++){
        tokenKey += Math.floor(Math.random() * 9) + 1;
    }

    return tokenKey;

}


module.exports = tokenGenerator;