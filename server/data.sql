-- copy paste the following into pgAdmin to create the database and tables

CREATE TABLE tasks (
  id VARCHAR(255) PRIMARY KEY,
  user_email VARCHAR(255),
  title VARCHAR(30),
  description TEXT,
  urgency INT,
  completion INT DEFAULT 0,
  date VARCHAR(300)
);

CREATE TABLE users (
  email VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255),
  address VARCHAR(255),
  dob DATE,
  hashed_password VARCHAR(255)
);

INSERT INTO tasks (id, user_email, title, urgency, date) VALUES
  ('1', 'name@email.com', 'Do the dishes', 1, '2020-01-01') 
