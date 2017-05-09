module.exports = {
	env: "test",
    port: 3000, 
	address: "localhost", 
	domain: "localhost:3000",
	db: "mongodb://localhost/exercise2_test",
	jwtSecret : "Ex&rCI$eII_T&stAPi",
	jwtSession : {session : false},
	expiresIn : 30,
	debug : false
};