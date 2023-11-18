-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE
    users (
        id SERIAL PRIMARY KEY NOT NULL,
        email VARCHAR(50) NOT NULL,
        password VARCHAR(255) NOT NULL,
        username VARCHAR(50) NOT NULL UNIQUE
    );
