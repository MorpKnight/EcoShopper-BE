DROP TABLE IF EXISTS users_products, products, producers, users CASCADE;
DROP TYPE IF EXISTS user_role, login_type, product_category, food_subcategory CASCADE;

CREATE TYPE user_role AS ENUM ('admin', 'user');
CREATE TYPE login_type AS ENUM ('email', 'google');
CREATE TYPE product_category AS ENUM ('fruits', 'vegetables', 'dairy', 'meat', 'seafood', 'bakery',
  'beverages', 'snacks', 'frozen', 'household', 'personal_care', 'baby_products', 'pet_supplies', 'health', 'beauty', 
  'electronics', 'clothing', 'stationery'
);
CREATE TYPE food_subcategory AS ENUM ('fruits', 'vegetables', 'meat', 'seafood', 'dairy', 'bakery', 
  'rice', 'noodles_pasta', 'snacks', 'frozen', 'beverages', 'spices_condiments');

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY NOT NULL DEFAULT GEN_RANDOM_UUID(),
  google_id TEXT,
  display_name TEXT NOT NULL,
  fullname TEXT NOT NULL,
  email text NOT NULL UNIQUE,
  password TEXT,
  login_type login_type NOT NULL DEFAULT 'email',
  display_picture TEXT,
  sustainability_rating NUMERIC NOT NULL DEFAULT 0,
  role user_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS producers (
  id UUID PRIMARY KEY NOT NULL DEFAULT GEN_RANDOM_UUID(),
  producer_name TEXT NOT NULL,
  producer_location TEXT NOT NULL,
  producer_description TEXT NOT NULL,
  producer_image TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY NOT NULL DEFAULT GEN_RANDOM_UUID(),
  product_name TEXT NOT NULL,
  product_description TEXT NOT NULL,
  product_category product_category NOT NULL,
  product_price NUMERIC NOT NULL,
  product_image TEXT,
  product_sustainability_rating NUMERIC NOT NULL,
  product_producer_id UUID NOT NULL REFERENCES producers(id),
  product_type TEXT NOT NULL CHECK (product_type IN ('food', 'non-food')),
  is_organic BOOLEAN DEFAULT FALSE,
  food_subcategory food_subcategory DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users_products (
  id UUID PRIMARY KEY NOT NULL DEFAULT GEN_RANDOM_UUID(),
  purchase_date TIMESTAMP NOT NULL DEFAULT NOW(),
  user_id UUID NOT NULL REFERENCES users(id),
  product_id UUID NOT NULL REFERENCES products(id),
  quantity NUMERIC NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS session (
    sid VARCHAR NOT NULL COLLATE "default",
    sess JSON NOT NULL,
    expire TIMESTAMP(6) NOT NULL,
    PRIMARY KEY (sid)
);