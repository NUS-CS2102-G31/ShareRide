-- CREATE EXTENSION pgcrypto;
/*DROP TABLE IF EXISTS PassengerRewards;
DROP TABLE IF EXISTS Passengers;
DROP TABLE IF EXISTS Cars;
DROP TABLE IF EXISTS Drivers;
DROP TABLE IF EXISTS Routes;
DROP TABLE IF EXISTS Locations;
DROP TABLE IF EXISTS Ratings;
DROP TABLE IF EXISTS Rewards;
DROP TABLE IF EXISTS Advertisements;
DROP TABLE IF EXISTS Bids;
DROP TABLE IF EXISTS Rides;
DROP TABLE IF EXISTS RidePassengers;
DROP TABLE IF EXISTS Payments;
DROP TABLE IF EXISTS Users;*/

SET SEARCH_PATH TO rideshare;

CREATE TABLE Users (
	username TEXT PRIMARY KEY,
	password TEXT NOT NULL
);

CREATE TABLE Cars (
	plateNum TEXT PRIMARY KEY,
	numSeats INT,
	CHECK(numSeats > 0)
);

CREATE TABLE Drivers (
	username TEXT PRIMARY KEY REFERENCES Users(username) ON DELETE CASCADE,
	email TEXT UNIQUE NOT NULL,
	fullName TEXT NOT NULL,
	phone TEXT UNIQUE NOT NULL,
	mileage INT DEFAULT 0,
	carPlate TEXT REFERENCES Cars(plateNum) NOT NULL,
	UNIQUE(carPlate)
);

CREATE TABLE Passengers (
	username TEXT PRIMARY KEY REFERENCES Users(username) ON DELETE CASCADE,
	email TEXT UNIQUE,
	fullName TEXT,
	phone TEXT UNIQUE,
	points INT DEFAULT 0,
	CHECK(points >= 0) 
);

CREATE TABLE Locations (
	address TEXT PRIMARY KEY,
	long numeric(9, 6) NOT NULL,
	lat numeric(9, 6) NOT NULL
);

CREATE TABLE Routes(
	routeId SERIAL PRIMARY KEY,
	origin TEXT REFERENCES Locations(address) NOT NULL,
	destination TEXT REFERENCES Locations(address) NOT NULL,
	distance INT NOT NULL,
	UNIQUE(origin, destination),
	CHECK (origin <> destination)
);

CREATE TABLE Ratings (
	username TEXT PRIMARY KEY REFERENCES Users(username),
	driverRating numeric(3, 2),
	passengerRating numeric(3, 2),
	tripsDriven INT,
	tripsRiden INT
);

CREATE TABLE Rewards (
	rewardId SERIAL PRIMARY KEY,
	rewardName TEXT NOT NULL, 
	points INT NOT NULL,
	discount INT NOT NULL,
	CHECK(discount > 0 AND discount < 100)
);

CREATE TABLE PassengerRewards (
	username TEXT REFERENCES Passengers(username) ON DELETE CASCADE,
	rewardId SERIAL REFERENCES Rewards(rewardId),
	PRIMARY KEY(username, rewardId)
);

CREATE TABLE Rides (
	rideId SERIAL UNIQUE,
	RideStartTime TIMESTAMP NOT NULL,
	RideEndTime TIMESTAMP,
	routeId SERIAL REFERENCES Routes(routeId) NOT NULL,
	car TEXT REFERENCES Cars(plateNum) NOT NULL,
	driver TEXT REFERENCES Drivers(username) NOT NULL,
	price INT NOT NULL,
	status INT DEFAULT 1,
	PRIMARY KEY(rideId, driver),
	CHECK(status IN (1, 2, 3, 4) AND price > 0)
	-- 1 In progress, 2 Completed, 3 Cancelled by driver, 4 All passengers cancelled
);

CREATE TABLE Advertisements (
	adId SERIAL PRIMARY KEY,
	startingBid NUMERIC NOT NULL,
	RideStartTime TIMESTAMP NOT NULL,
	bidEndTime TIMESTAMP NOT NULL,
	rideId SERIAL REFERENCES Rides(rideId) NOT NULL,
	advertiser TEXT REFERENCES Drivers(username),
	status INT DEFAULT 1,
	CHECK(status IN (1, 2, 3)),
	UNIQUE(rideId)
	-- 1 Bidding, 2 Completed, 3 Cancelled
);

CREATE TABLE Bids (
	bidTime TIMESTAMP,
	adId SERIAL REFERENCES Advertisements(adId),
	bidder TEXT REFERENCES Passengers(username),
	currentBid numeric(3, 2) NOT NULL,
	PRIMARY KEY(bidTime, adId, bidder)
);
  	
CREATE TABLE Payments (
	passenger TEXT REFERENCES Passengers(username),
	rideId SERIAL REFERENCES Rides(rideId),
	actualAmount NUMERIC NOT NULL,
	amountPaid NUMERIC NOT NULL,
	PRIMARY KEY(passenger, rideId)
);

CREATE OR REPLACE FUNCTION PassengerToUser()
RETURNS TRIGGER AS $$ 
BEGIN
	INSERT INTO users(username)
	VALUES(new.username);
		RETURN new;
END; 
$$ 
LANGUAGE plpgsql;

CREATE TRIGGER trig_PU
	AFTER INSERT ON Passengers 
	FOR EACH ROW
	EXECUTE PROCEDURE PassengerToUser();


CREATE OR REPLACE FUNCTION DriverToCar()
RETURNS TRIGGER AS $$
BEGIN
	INSERT INTO cars(carPlate)
	VALUES(new.carPlate);
		RETURN new;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER trig_DC
	AFTER INSERT ON Drivers 
	FOR EACH ROW
	EXECUTE PROCEDURE DriverToCar();

 CREATE OR REPLACE FUNCTION ChangeStatus()
 RETURNS TRIGGER AS $$ 
 BEGIN
 	UPDATE Rides 
 	SET status = 2
 	WHERE rides.rideId = new.rideId; 
 	RETURN new;
 END;
 $$
 LANGUAGE plpgsql;

CREATE TRIGGER trig_CS
	AFTER INSERT ON Payments 
	FOR EACH ROW
	EXECUTE PROCEDURE ChangeStatus();