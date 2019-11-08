-- CREATE EXTENSION pgcrypto;
-- SET search_path TO rideshare;

DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Cars CASCADE;
DROP TABLE IF EXISTS Drivers CASCADE;
DROP TABLE IF EXISTS Routes CASCADE;
DROP TABLE IF EXISTS Rewards CASCADE;
DROP TABLE IF EXISTS Rides CASCADE;
DROP TABLE IF EXISTS Advertisements CASCADE;
DROP TABLE IF EXISTS Bids CASCADE;
DROP TABLE IF EXISTS Bookings CASCADE;


CREATE TABLE Users (
	username TEXT PRIMARY KEY,
	password TEXT NOT NULL,
	email TEXT UNIQUE NOT NULL,
	fullName TEXT NOT NULL,
	phone TEXT UNIQUE NOT NULL
);

CREATE TABLE Cars (
	carplate TEXT PRIMARY KEY,
	model TEXT,
	numSeats INT DEFAULT 4,
	CHECK(numSeats > 0)
);

CREATE TABLE Drivers (
	username TEXT PRIMARY KEY REFERENCES Users(username) ON DELETE CASCADE,
	carPlate TEXT REFERENCES Cars(carplate) NOT NULL,
	UNIQUE(carPlate)
);

CREATE TABLE Routes(
	routeId SERIAL PRIMARY KEY,
	origin TEXT NOT NULL,
	destination TEXT NOT NULL,
	distance INT NOT NULL,
	UNIQUE(origin, destination),
	CHECK (origin <> destination)
);

CREATE TABLE Rewards (
	username TEXT REFERENCES Users(username) ON DELETE CASCADE,
	rewardName TEXT NOT NULL,
	discount INT NOT NULL,
	PRIMARY KEY(username, rewardName),
	CHECK(discount > 0 AND discount < 100)
);

CREATE TABLE Rides (
	rideId SERIAL UNIQUE,
	rideStartTime TIMESTAMP NOT NULL,
	routeId SERIAL REFERENCES Routes(routeId) NOT NULL,
	car TEXT REFERENCES Cars(carplate) NOT NULL,
	driver TEXT REFERENCES Drivers(username) NOT NULL,
	price NUMERIC(5,2),
	status INT DEFAULT 1,
	PRIMARY KEY(rideId, driver),
	CHECK(status IN (1, 2, 3) AND price > 0)
	-- 1 Bidding, 2 Completed, 3 Cancelled
);

CREATE TABLE Advertisements (
	adId SERIAL PRIMARY KEY,
	startingBid NUMERIC(5,2) NOT NULL,
	bidEndTime TIMESTAMP NOT NULL,
	rideId SERIAL REFERENCES Rides(rideId) NOT NULL,
	advertiser TEXT REFERENCES Drivers(username),
	UNIQUE(rideId)
);

CREATE TABLE Bids (
	adId SERIAL REFERENCES Advertisements(adId),
	bidder TEXT REFERENCES Users(username),
	currentBid numeric(5, 2) NOT NULL,
	PRIMARY KEY(adId, bidder)
);
  	
CREATE TABLE Bookings (
	passenger TEXT REFERENCES Users(username),
	rideId SERIAL REFERENCES Rides(rideId),
	initialPrice NUMERIC(5,2) NOT NULL,
	paymentAmount NUMERIC NOT NULL,
	paymentStatus INT DEFAULT 1,
	PRIMARY KEY(passenger, rideId),
	CHECK(paymentStatus IN (1, 2))
	-- 1 Payment incomplete, 2 Payment completed
);

CREATE OR REPLACE FUNCTION CheckBid()
RETURNS TRIGGER AS $$
BEGIN
	RAISE NOTICE 'currentBid too low!';
	RETURN NULL;
END;
$$LANGUAGE plpgsql;

CREATE TRIGGER trig_CB
	BEFORE UPDATE ON Bids
	FOR EACH ROW WHEN (NEW.currentBid <= OLD.currentBid)
	EXECUTE PROCEDURE CheckBid();

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
	BEFORE INSERT ON Drivers 
	FOR EACH ROW
	EXECUTE PROCEDURE DriverToCar();

CREATE OR REPLACE FUNCTION ChangeStatus()
RETURNS TRIGGER AS $$ 
BEGIN
	UPDATE Rides 
	SET status = 
	CASE WHEN ((SELECT COUNT(passenger) FROM Bookings WHERE rideId = NEW.rideId AND paymentStatus = 2)=(SELECT COUNT(passenger) FROM Bookings WHERE rideId = NEW.rideId)) THEN 2
	ELSE 1 END
	WHERE rides.rideId = new.rideId;
	RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER trig_CS
	AFTER UPDATE ON Bookings 
	FOR EACH ROW 
	EXECUTE PROCEDURE ChangeStatus();