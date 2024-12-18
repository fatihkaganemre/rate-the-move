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
