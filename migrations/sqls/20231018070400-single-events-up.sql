CREATE TABLE tbl_single(
    id SERIAL PRIMARY KEY,
    userId uuid NOT NULL,
    eventId INT NOT NULL,
    participantEmail VARCHAR NOT NULL,
    participantName VARCHAR NOT NULL,
    participantPhone VARCHAR NOT NULL
);