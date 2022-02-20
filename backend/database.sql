drop table if exists users;
drop table if exists hostels;
drop table if exists messages;


CREATE TABLE users (
  id        SERIAL PRIMARY KEY,
  user_email VARCHAR (120) not null,
  user_name VARCHAR (100)
);

CREATE TABLE hostels (
  id        SERIAL PRIMARY KEY,
  hostel_name VARCHAR (120) not null
);

CREATE TABLE messages (
  user_id INT REFERENCES users(id),
  content     VARCHAR(2000)
);

INSERT INTO users (user_email, user_name) VALUES ('user1@mail.com', 'user1');
INSERT INTO users (user_email, user_name) VALUES ('suman@gmail.com', 'Suman');
INSERT INTO users (user_email, user_name) VALUES ('rana@gmail.com', 'Rana');
INSERT INTO users (user_email, user_name) VALUES ('diego@gmail.com', 'Diego');
INSERT INTO users (user_email, user_name) VALUES ('vin@gmail.com', 'Vin');
INSERT INTO users (user_email, user_name) VALUES ('yogi@gmail.com', 'Yogi');

INSERT INTO hostels (hostel_name) VALUES ('Hostel One');
INSERT INTO hostels (hostel_name) VALUES ('Hostel Two');
INSERT INTO hostels (hostel_name) VALUES ('Hostel Three');
INSERT INTO hostels (hostel_name) VALUES ('Hostel Four');


INSERT INTO messages (user_id, content) VALUES (1, 'Hello World');
INSERT INTO messages (user_id, content) VALUES (2,'Hello Barcelona');
INSERT INTO messages (user_id, content) VALUES (3,'Hello Spain');
INSERT INTO messages (user_id, content) VALUES (4,'Hello Europe');

insert into hostels (hostel_name) values ('test hostel') RETURNING hostel_name; 


select * from hostels where id = 2;

select hostel_name from hostels where id === 2;
