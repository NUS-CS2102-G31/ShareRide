function insertNewPassenger(username, email, fullName, phone) {
    query = `INSERT INTO Passengers VALUES('${username}','${email}','${fullName}','${phone}');`;
    return query;
}

function insertNewDriver(username, carPlate) {
    query = `INSERT INTO Drivers VALUES('${username}','${carPlate}');`;
    return query;
}

function setCarProfile(carPlate, model, numSeats) {
    query = `UPDATE Cars 
                SET numSeats = '${numSeats}',
                    model = '${model}',
                WHERE LOWER(carPlate) = LOWER('${carPlate}')`;
    return query;
}

function advertise(startingBid, bidEndTime, rideId, advertiser) {
    query = `INSERT INTO Advertisements VALUES('${startingBid}','${bidEndTime}','${rideId}','${advertiser}');`;
    return query;
}

function insertBid(adId,bidder,currentBid) {
    query = `INSERT INTO Bids VALUES('${adId}','${bidder}','${currentBid}');`;
    return query;
}

function updateBid(adId,bidder,currentBid) {
    query = `UPDATE ON Bids
                SET currentBid = '${currentBid}'
                WHERE adId = '${adId}'
                AND LOWER(bidder) = LOWER('${bidder}');`
    return query;
}

function viewAvailableRides() {
    query = `SELECT * FROM Advertisements A WHERE A.bidEndTime > NOW()`;
    return query;
}

function cancelBid(adId, bidder) {
    query = `DELETE FROM Bids WHERE adId = '${adId}' AND LOWER(bidder) = LOWER('${bidder}');`;
    return query;
}

//TODO: EDIT LATER
function viewBiddingResults(adId) {
    query = `SELECT Bids.adId,Rides.rideId,Bids.bidder
                FROM Bids
                INNER JOIN Advertisements ON Advertisements.adId = Bids.adId
                INNER JOIN Rides ON Advertisements.rideId = Rides.rideId
                INNER JOIN Cars ON LOWER(Rides.car) = LOWER(Cars.carPlate)
                WHERE Bids.adId = '${adId}' AND Advertisements.bidEndTime < NOW()
                ORDER BY Bids.currentBid DESC
                LIMIT Cars.numSeats; `;
    return query;
}

function getLowestWinningBid() {
    query = `SELECT cb.adid, cb.currentbid as winningbid
                FROM (SELECT * 
                    FROM bids b
                    INNER JOIN advertisements A ON b.adid = A.adid 
                    WHERE A.bidendtime < NOW() 
                    GROUP BY b.adid) cb
                INNER JOIN Drivers d ON LOWER(cb.advertiser) = LOWER(d.username)
                INNER JOIN Cars c ON LOWER(d.carplate) = LOWER(c.carplate) 
                ORDER BY cb.currentbid DESC
                LIMIT 1 OFFSET c.numseats`;
    return query;
}

function viewPastRides(userType,name) { //1 is passenger, 2 is driver
    query = ``;
    if (usertype == 1) {
        query = `SELECT ri.rideId, ri.rideStartTime, ro.origin, ro.destination, ro.distance,
                    ri.car, ri.driver, ri.price, ri.status
                    FROM Rides ri
                    NATURAL JOIN ro
                    INNER JOIN Bookings b ON b.rideId = ri.rideId
                    WHERE (status = 2 OR status = 3) AND LOWER(b.passenger) = LOWER('${name}');`;
        return query;
    }

    else if (usertype == 2) {
        query = `SELECT *
                    FROM Rides R
                    NATURAL JOIN Routes
                    WHERE (status = 2 OR status = 3) AND LOWER(driver) = LOWER('${name}');`;
        return query;
    }

    error = 'usertype = 1 for passenger, usertype = 2 for driver';
    return error;
}

function viewPastAdvertisements(advertiser) {
    query = `SELECT * 
                FROM Advertisements A
                WHERE LOWER(A.advertiser) = LOWER('${advertiser}') AND A.bidEndTime < NOW();`;
    return query;
}

//Before passenger secure ride
function cancelBid(adId,name){
    query = `DELETE from Bids b
                WHERE LOWER(b.bidder) = LOWER('${name}') AND b.adId = '${adId}';`;
    return query;
}

//After passenger successfully secures a ride
function cancelBooking(rideId, name){
    query = `DELETE from Bookings b
                WHERE b.rideId = '${rideId}' AND LOWER(b.passenger) = LOWER('${name}');`;
    return query;
}

function getDriverStats(name){
    query = `WITH DriverAveEarnings AS (
                SELECT driver, AVG(price) avePrice
                FROM Rides R
                WHERE R.price IS NOT NULL 
                GROUP BY R.driver
            ),

            PassengersPerRide AS (
                SELECT b.rideId, r.driver, COUNT(DISTINCT passenger) total_passengers
                FROM Bookings b
                INNER JOIN Rides r
                ON r.driver = b.rideId
                WHERE b.paymentStatus = 2
                GROUP BY b.rideId
            )

            SELECT d.driver, d.avePrice, p.total_passengers
            FROM DriverAveEarnings d, PassengersPerRide p
            WHERE d.driver = p.driver AND LOWER(d.driver) = LOWER('${name}');`;

    return query;
}

//for every location, find number of distinct drivers that use it as an origin and number of distinct drivers that use it as a destination
function locationPopularityDrivers(){
    query = `WITH originDriver AS (
                    SELECT Rt.origin, COUNT(DISTINCT d.username) num
                    FROM Drivers D
                    JOIN Rides Rd ON D.username = Rd.driver
                    JOIN Routes Rt ON Rd.routeId = Rt.routeId
                ),

                destinationDriver AS (
                    SELECT Rt.destination, COUNT(DISTINCT d.username) num
                    FROM Drivers D
                    JOIN Rides Rd ON D.username = Rd.driver
                    JOIN Routes Rt ON Rd.routeId = Rt.routeId
                )

            SELECT o.origin, o.num, d.num
            FROM originDriver o
            JOIN destinationDriver d ON o.origin = o.destination;`;

    return query
}

//for every passenger, find every location they visit more often than the average count of their visits to other locations

function popularLocationPerPassenger(){
    query = `WITH rideInfo AS (
                SELECT U.username, Rt.destination, COUNT(DISTINCT Rd.rideId) AS countRides
                    FROM Users U
                    JOIN Bookings B ON U.username = B.passenger
                    JOIN Rides Rd ON B.rideId = Rd.rideId
                    JOIN Routes Rt ON Rd.routeId = Rt.routeId
                    GROUP BY U.username, Rt.destination
                    ),

                averageVisit AS (
                    SELECT U.username, COUNT(DISTINCT Rd.rideId) / COUNT(DISTINCT Rt.destination) AS avgRides
                        FROM Users U
                        JOIN Bookings B ON U.username = B.passenger
                        JOIN Rides Rd ON B.rideId = Rd.rideId
                        JOIN Routes Rt ON Rd.routeId = Rt.routeId
                        GROUP BY U.username, Rt.destination
                    )

                SELECT rideInfo.username, rideInfo.destination
                FROM rideInfo r
                JOIN averageVisit a ON r.username = a.username
                WHERE r.countRides > a.avgRides;`;

    return query;
}