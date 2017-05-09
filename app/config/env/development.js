module.exports = {
	env: "development",
	port: 3000, 
	address: "localhost", 
	domain: "localhost:3000",
	db: "mongodb://localhost/exercise2",
	jwtSecret : "Ex&rCI$eII-D&v_APi",
	jwtSession : {session : false},
	expiresIn : (10 * 60),
	debug : false
};