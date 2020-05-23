Put in your MySQL config details in /db/connect.js

### Run the following queries to add table:
- CREATE TABLE flights(flightNumber VARCHAR(5) PRIMARY KEY, seatCount INT(3) NOT NULL);
- CREATE TABLE users(userName VARCHAR(20) NOT NULL, userId INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY);

### Populate some values:
- insert into flights values("AB500", 50);
- insert into users(userName) values("DannyM");
