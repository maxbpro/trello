CREATE TABLE USER (
	id BIGINT PRIMARY KEY NOT NULL,
	email VARCHAR(100),
	name VARCHAR(200),
  password VARCHAR(100)
);

INSERT INTO USER (id, email, name, password) values (1, 'maxbpro2009@gmail.com','Maxim Buyanow', '$2a$10$LQFty1ibC.aVJGfT0Ev/cOeFxGoJipDdt4y1CXPLkUGCy9kKVi7ye');


