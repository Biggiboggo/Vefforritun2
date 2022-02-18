CREATE TABLE IF NOT EXISTS events(
  id serial primary key,
  name varchar(64) not null,
  slug varchar(64) not null unique,
  description varchar(400) not null,
  created timestamp with time zone not null default current_timestamp,
  updated timestamp with time zone not null default current_timestamp
);

CREATE TABLE IF NOT EXISTS signings(
  id serial primary key,
  name varchar(64) not null,
  comment varchar(400) not null,
  event serial,
  created timestamp with time zone not null default current_timestamp
);

CREATE TABLE IF NOT EXISTS users (
  id serial primary key,
  username character varying(64) NOT NULL,
  password character varying(256) NOT NULL
);