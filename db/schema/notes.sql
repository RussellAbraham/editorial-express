DROP TABLE IF EXISTS notes CASCADE;

CREATE TABLE notes (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    notebook_id INTEGER REFERENCES notebooks(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    body TEXT, -- Assuming CKEditor content will be stored as text
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'UTC'),
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'UTC')
);
