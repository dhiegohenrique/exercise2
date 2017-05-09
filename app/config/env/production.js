module.exports = {
    env: "production",
    port: process.env.PORT,
    address: process.env.APP_NAME + ".herokuapp.com",
    domain: process.env.APP_NAME + ".herokuapp.com",
	db: process.env.MONGODB_URI + "/exercise2",
	jwtSecret : "Ex&rCI$eII_APi",
	jwtSession : {session : false},
	expiresIn : 3600,
    debug : true
};