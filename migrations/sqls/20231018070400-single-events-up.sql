CREATE TABLE tbl_single(
    id uuid PRIMARY KEY,
    userId uuid NOT NULL,
    eventId uuid NOT NULL,
    loggedInEmail VARCHAR NOT NULL,
    participantEmail VARCHAR NOT NULL,
    participantName VARCHAR NOT NULL,
    participantPhone VARCHAR NOT NULL,
    courseName VARCHAR NOT NULL,
    collegeName VARCHAR NOT NULL
);