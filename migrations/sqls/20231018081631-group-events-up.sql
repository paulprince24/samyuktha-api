CREATE TABLE tbl_group(
    id SERIAL PRIMARY KEY,
    userId uuid NOT NULL,
    eventId INT NOT NULL,
    participant1Email VARCHAR NOT NULL,
    participant1Name VARCHAR NOT NULL,
    participant1Phone VARCHAR NOT NULL,
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