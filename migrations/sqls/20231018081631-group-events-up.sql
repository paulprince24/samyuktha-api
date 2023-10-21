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

CREATE TABLE tbl_group(
    id uuid PRIMARY KEY,
    userId uuid NOT NULL,
    eventId uuid NOT NULL,
    loggedInEmail VARCHAR NOT NULL,
    participant1Email VARCHAR NOT NULL,
    participant1Name VARCHAR NOT NULL,
    participant1Phone VARCHAR NOT NULL,
    courseName VARCHAR NOT NULL,
    collegeName VARCHAR NOT NULL,
    participant2Name VARCHAR,
    participant2Phone VARCHAR,
    participant3Name VARCHAR,
    participant3Phone VARCHAR,
    participant4Name VARCHAR,
    participant4Phone VARCHAR,
    participant5Name VARCHAR,
    participant5Phone VARCHAR,
    FOREIGN KEY(eventId) REFERENCES tbl_events(id)
);