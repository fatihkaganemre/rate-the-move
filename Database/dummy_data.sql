CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE, -- Team name (e.g., "Eagles")
    description TEXT, -- Optional description of the team
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    team_id INTEGER REFERENCES teams(id) ON DELETE SET NULL, -- Optional team association
    name TEXT NOT NULL,
    surname TEXT,
    image_url TEXT,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    type VARCHAR(20) CHECK (type IN ('competitor', 'coach')),
    level INTEGER DEFAULT null, -- Optional can be null for coaches
    number_of_moves INTEGER DEFAULT null -- Optional can be null for coaches
);

CREATE TABLE moves (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, -- Competitor id
    title TEXT NOT NULL,
    description TEXT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    video_url TEXT NOT NULL
);

CREATE TABLE ratings (
    id SERIAL PRIMARY KEY,
    move_id INTEGER REFERENCES moves(id) ON DELETE CASCADE, -- Links to the move
    coach_id INTEGER REFERENCES users(id) ON DELETE SET NULL, -- Coach who rated
    rate INTEGER CHECK (rate BETWEEN 1 AND 5), -- Rating scale (1-10)
    comment TEXT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


--- EXAMPLE DATA ----
INSERT INTO teams (id, name, description)
VALUES (1, 'Kuzi', 'The best tem ever');

INSERT INTO users (id, team_id, name, surname, image_url, email, password, type, level)
VALUES 
(1, 1, 'Fatih Kagan', 'Emre', 'https://github.com/mdo.png', 'fatih.coach@test.com', '1234', 'coach', NULL),
(2, 1, 'Fatih Kagan', 'Emre', 'https://github.com/mdo.png', 'fatih.competitor@test.com', '1234', 'competitor', 1),
(3, 1, 'Maciej', 'Drazewski', 'https://github.com/mdo.png', 'maciej@test.com', '1234', 'competitor', 2),
(4, 1, 'Hubert', 'Kaczmarek', 'https://github.com/mdo.png', 'hubert@test.com', '1234', 'competitor', 3),
(5, 1, 'Kuba', 'Pietrucha', 'https://github.com/mdo.png', 'kuba@test.com', '1234', 'competitor', 4);

INSERT INTO moves (id, user_id, title, description, date, video_url)
VALUES 
(1, 2, 'Spin Flip', 'A high-difficulty move involving a 360-degree spin followed by a mid-air flip.', '2023-11-20 10:15:00', 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'), 
(2, 3, 'Double Backflip', 'A two-step backflip performed with exceptional agility.', '2023-11-22 14:30:00', 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'),
(3, 3, 'Front Tuck Roll', 'A forward tuck followed by a smooth landing roll.', '2023-11-23 09:45:00', 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4');

INSERT INTO ratings (id, move_id, coach_id, rate, comment)
VALUES (1, 2, 1, 4, 'Not bad');
