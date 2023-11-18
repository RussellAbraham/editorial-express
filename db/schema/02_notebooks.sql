DROP TABLE IF EXISTS notebooks CASCADE;

CREATE TABLE notebooks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
        ON DELETE CASCADE -- Optional, defines behavior when a referenced user is deleted
);
