var mysql = require('mysql');
require('dotenv').config();

var db_config = {
	host: '127.0.0.1',
	port: '3307',
	user: 'tarun',
	password: '123456',
	database: 'flightdb',
};

var connection;

function handleConnection() {
	connection = mysql.createConnection(db_config);
	connection.connect((err) => {
		if (err) {
			console.log("Connection to the database failed!" + err);
			setTimeout(handleConnection, 2000);
		} else {
			console.log("Connection established!");
		}
	});
	connection.on('error', (err) => {
		if (err.code === "PROTCOL_CONNECTION_LOST") {
			handleConnection();
		} else {
			throw err;
		}
	});
}

handleConnection();

module.exports = connection; 
