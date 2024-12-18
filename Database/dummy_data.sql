-- --- EXAMPLE DATA ----
INSERT INTO teams (name, description)
VALUES ('Kuzi', 'The best tem ever');
 
INSERT INTO users (team_id, name, surname, image_url, email, password, type, level)
VALUES 
(1, 'Fatih Kagan', 'Emre', 'https://github.com/mdo.png', 'fatih.coach@test.com', '1234', 'coach', NULL),
(1, 'Fatih Kagan', 'Emre', 'https://github.com/mdo.png', 'fatih.competitor@test.com', '1234', 'competitor', 1),
(1, 'Maciej', 'Drazewski', 'https://github.com/mdo.png', 'maciej@test.com', '1234', 'competitor', 2),
(1, 'Hubert', 'Kaczmarek', 'https://github.com/mdo.png', 'hubert@test.com', '1234', 'competitor', 3),
(1, 'Kuba', 'Pietrucha', 'https://github.com/mdo.png', 'kuba@test.com', '1234', 'competitor', 4);

INSERT INTO moves (user_id, title, description, date, video_url)
VALUES 
(2, 'Spin Flip', 'A high-difficulty move involving a 360-degree spin followed by a mid-air flip.', '2023-11-20 10:15:00', 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'), 
(3, 'Double Backflip', 'A two-step backflip performed with exceptional agility.', '2023-11-22 14:30:00', 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'),
(3, 'Front Tuck Roll', 'A forward tuck followed by a smooth landing roll.', '2023-11-23 09:45:00', 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4');

INSERT INTO ratings (move_id, coach_id, rate, comment)
VALUES (2, 1, 4, 'Not bad');
