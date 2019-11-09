
insert into routes(origin,destination,distance) values ('NUS','Sentosa',6);
insert into routes(origin,destination,distance) values ('Changi Airport','Marina Bay Sands',15);

insert into rides(rideStartTime,routeId,car,driver,status) values (Now(),1, 'WVGAV7A', 'icolgrave1d', 1);
insert into rides(rideStartTime,routeId,car,driver,status) values (Now(),2, '2G4WC55', 'tballing1c', 1);

insert into advertisements(startingBid,bidEndTime,rideId,advertiser) values (10,now() + interval '1' day,1,'icolgrave1d');
insert into advertisements(startingBid,bidEndTime,rideId,advertiser) values (25,now() + interval '1' day,2,'tballing1c');

insert into bids(adId,bidder,currentBid) values (1,'ylittleproudp', 14.00);
insert into bids(adId,bidder,currentBid) values (2,'iknifton1', 30.50);