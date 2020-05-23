const express  = require('express');
const users  = express.Router()
const cors = require('cors');
const db = require('../db/connect.js');

users.use(cors());

//Get Available Seats
users.get('/getAvailableSeats', (req,res) => {
	var number = req.query.flightNumber;
	var flightFetch = "Select * from flights where flightNumber = '"+number+"'";
	db.query(flightFetch, async (err,rows) => {
		if(err) {
			res.send("Could not perform the action" + err);
		} else {
			if(rows.length === 0) {
				res.send({status: "Failure"});
			} else {
				res.send({status: "Success", seatCount: rows[0].seatCount});
			}
		}
	});
});


//Book Ticket
users.post('/bookSeat', (req,res) => {
	const { flightNumber, userName } = req.body;
	var userFetch = "Select * from users where userName = '"+userName+"'";

	if(!flightNumber || !userName) {
		res.send({status: "Failure", message: "Input Error"});
	} else {
		db.query(userFetch, async (err,rows) => {
			if(err) {
				res.send({status: "Failure", message: "Database Error"});
			} else {
				if(rows.length === 0) {
					res.send({status: "Failure", message: "User not found"});
				} else {
					var flightFetch = "Select * from flights where flightNumber = '"+flightNumber+"'";

					db.query(flightFetch, (err,rows) => {
						if(err) {
							res.send({status: "Failure", message: "Database Error"});
						} else {
							if(rows.length === 0) {
								res.send({status: "Failure", message: "Flight not found"});	
							} else {
								if(rows[0].seatCount === 0) {
									res.send({status: "Failure", message: "Tickets Full"});
								} else {
									var seatNumber = rows[0].seatCount;
									var newSeatCount = rows[0].seatCount - 1;
									var updateSeat = "Update flights set seatCount = '"+newSeatCount+"' where flightNumber = '"+flightNumber+"'";

									db.query(updateSeat, async (err,rows) => {
										if(err) {
											res.send({status: "Failure", message: "Database Error"});
										}
									})
									res.send({status: "Success", seatNumber: seatNumber});
								}
							}
						}
					})
				}
			}
		});
	}
});


//Schedule Flight
users.post('/scheduleFlight', (req,res) => {
	const {flightNumber, seatCount} = req.body;
	var flightInsert = "Insert into flights values('"+flightNumber+"', '"+seatCount+"')";

	if(!flightNumber || !seatCount) {
		res.send({status: "Failure", message: "Input Error"});
	} else {
		db.query(flightInsert, async (err,rows) => {
			if(err) {
				console.log(err);
				res.send({status: "Failure", message: "Database Error"});
			} else {
				if(rows.length === 0) {
					res.send({status: "Failure", message: "Flight already exists"});
				} else {
					res.send({status: "Success"});
				}
			}
		});
	}

});

module.exports = users