CREATE TABLE STORY (
	id BIGINT PRIMARY KEY NOT NULL,
	title VARCHAR(255),
	description VARCHAR(255),
  criteria VARCHAR(100),
  status VARCHAR(100),
  type VARCHAR(100),
  reporter BIGINT NOT NULL,
  assignee BIGINT NOT NULL
);


INSERT INTO STORY (id, title, description, criteria, status, type, reporter, assignee) values (1, 'Story 1','Story description', 'criteria', 'To Do', 'Bug', 1, 1);


