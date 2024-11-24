CREATE TYPE user_role AS ENUM ('admin', 'user');
CREATE TYPE product_category AS ENUM ('fruits', 'vegetables', 'dairy', 'meat', 'seafood', 'bakery',
  'beverages', 'snacks', 'frozen', 'household', 'personal_care', 'baby_products', 'pet_supplies', 'health', 'beauty', 
  'electronics', 'clothing', 'stationery'
);

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY NOT NULL,
  display_name TEXT NOT NULL,
  email text NOT NULL,
  display_picture TEXT,
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

DROP TYPE IF EXISTS user_role, product_category CASCADE;
DROP TABLE IF EXISTS users_products, products, producers, users CASCADE;