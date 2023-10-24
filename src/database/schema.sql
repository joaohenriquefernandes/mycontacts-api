CREATE DATABASE IF NOT EXISTS mycontacts;

CREATE EXTENSION IF NOT EXISTS'uuid-ossp';

CREATE DATABASE IF NOT EXISTS categories (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
);

CREATE DATABASE IF NOT EXISTS contatcs (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  email VARCHAR UNIQUE,
  phone VARCHAR,
  category_id UUID,
  FOREIGN KEY (category_id) REFERENCES category (id),
);
