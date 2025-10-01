CREATE TABLE users (
  id serial PRIMARY KEY,
  username text UNIQUE NOT NULL,
  avatar text,
  provider text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE sessions (
  id serial PRIMARY KEY,
  user_id int references users(id),
  token text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE analyses (
  id serial PRIMARY KEY,
  user_id int references users(id),
  code text,
  logs text,
  suggestion jsonb,
  created_at timestamptz DEFAULT now()
);
