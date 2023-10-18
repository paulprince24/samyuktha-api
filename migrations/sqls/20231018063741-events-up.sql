CREATE TABLE tbl_events(
    id uuid PRIMARY KEY,
    cover VARCHAR NOT NULL,
    eventName VARCHAR NOT NULL,
    eventDescription VARCHAR NOT NULL,
    themeName VARCHAR NOT NULL,
    eventCategory VARCHAR NOT NULL,
    eventType VARCHAR NOT NULL,
    facultyInCharge VARCHAR NOT NULL,
    facultyMobile VARCHAR NOT NULL,
    firstPrize VARCHAR NOT NULL,
    secondPrize VARCHAR NOT NULL,
    studentIncharge1 VARCHAR NOT NULL,
    studentIncharge1Mobile VARCHAR NOT NULL,
    studentIncharge2 VARCHAR NOT NULL,
    studentIncharge2Mobile VARCHAR NOT NULL,
    teamStrength INT NOT NULL,
    regFee INT NOT NULL
);

CREATE TABLE tbl_rules(
    id uuid PRIMARY KEY,
    eventid uuid NOT NULL,
    rule_1 VARCHAR,
    rule_2 VARCHAR,
    rule_3 VARCHAR,
    rule_4 VARCHAR,
    rule_5 VARCHAR,
    rule_6 VARCHAR,
    rule_7 VARCHAR,
    rule_8 VARCHAR,
    rule_9 VARCHAR,
    rule_10 VARCHAR,
    rule_11 VARCHAR,
    rule_12 VARCHAR,
    rule_13 VARCHAR,
    FOREIGN KEY(eventid) REFERENCES tbl_events(id)
);


INSERT INTO
    tbl_events(
        id,
        cover,
        eventName,
        eventDescription,
        themeName,
        eventCategory,
        eventType,
        facultyInCharge,
        facultyMobile,
        firstPrize,
        secondPrize,
        studentIncharge1,
        studentIncharge1Mobile,
        studentIncharge2,
        studentIncharge2Mobile,
        teamStrength,
        regFee
    )
VALUES
    (
        "9bfb1b8c-3129-4090-aa24-d8d3e2dfc29f",
        'https://cdn.discordapp.com/attachments/1164078126838595616/1164078821046243419/ideathon_1_1.jpg?ex=6541e7e2&is=652f72e2&hm=da2d712aa0ff21e96bb4946af933d8b8b48b31921b367cdb5d484b9f63d11a6c&',
        'ideathon',
        'blasafheihfoiewhfowehfoiwe',
        'Ghostly Think Tank',
        'techinical',
        'group',
        'Dr Biku Abraham',
        '9447797909',
        '4000',
        '2000',
        'Akshay Anil',
        '7907987856',
        'Jeffin Sam George',
        '9605696591',
        4,
        80
    );

INSERT INTO
    tbl_rules(
        id,
        eventid,
        rule_1,
        rule_2,
        rule_3,
        rule_4,
        rule_5,
        rule_6,
        rule_7,
        rule_8,
        rule_9,
        rule_10,
        rule_11,
        rule_12,
        rule_13
    )
VALUES
    (
        "9bfb1b8c-3129-4090-aa24-d8d3e2dfc29f",
        'A team can have 2-4 members.',
        'The decision of the judging panel will be final.',
        'The organizing committee has the rights to make changes to the event.',
        'The event is only for PG and UG students other than Engineering stream.',
        'The selection will be based on preliminary round.',
        'All teams should bring their own Laptops and other required Gadgets.',
        'The competition will have a specific theme or problem statement that the teams need toaddress through their idea. The theme will be announced on the day of the competition.',
        'Each team must submit their idea in a PowerPoint. The submission should be no longerthan 10 slides and must include a title slide, problem statement, solution, implementationplan, and any necessary visuals. The deadline for submission will be 3 hours from the start ofthe competition.',
        'Each team shall be allotted 5 minutes for presentation.',
        'The presentation shall be followed by a Q/A round where the judges shall pose questionsregarding the presentation.',
        'Copying of ideas is strictly prohibited.',
        'Judging will be based on innovativeness and feasibility of the presented idea.',
        'Rules are subjected to change by committee members if certain criteria(s) are not met.'
    );

