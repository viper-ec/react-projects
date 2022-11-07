-- Create tasks database
CREATE DATABASE tasksdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create table tasks
drop table if exists tasks;

create table tasks (
  id int auto_increment,
  title varchar(200) not null,
  description varchar(300) null,
  done tinyint not null default 0,
  createdAt timestamp not null default CURRENT_TIMESTAMP,
  primary key(id)
);

