DROP TABLE IF EXISTS users_products, products, producers, users CASCADE;
DROP TYPE IF EXISTS user_role, product_category, food_subcategory CASCADE;

CREATE TYPE user_role AS ENUM ('admin', 'user');
CREATE TYPE product_category AS ENUM ('fruits', 'vegetables', 'dairy', 'meat', 'seafood', 'bakery',
  'beverages', 'snacks', 'frozen', 'household', 'personal_care', 'baby_products', 'pet_supplies', 'health', 'beauty', 
  'electronics', 'clothing', 'stationery'
);
CREATE TYPE food_subcategory AS ENUM ('fruits', 'vegetables', 'meat', 'seafood', 'dairy', 'bakery', 
  'rice', 'noodles_pasta', 'snacks', 'frozen', 'beverages', 'spices_condiments');

CREATE TABLE IF NOT EXISTS users (
  id text PRIMARY KEY NOT NULL,
  display_name TEXT NOT NULL,
  email text NOT NULL,
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
  user_id text NOT NULL REFERENCES users(id),
  product_id UUID NOT NULL REFERENCES products(id),
  quantity NUMERIC NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Dummy data for producers
INSERT INTO producers (producer_name, producer_location, producer_description, producer_image)
VALUES 
('Green Farms', 'California, USA', 'Organic farm producing fresh vegetables and fruits', 'green_farms.jpg'),
('Dairy Delight', 'Wisconsin, USA', 'Family-owned dairy farm', 'dairy_delight.jpg'),
('Seafood Haven', 'Maine, USA', 'Sustainable seafood supplier', 'seafood_haven.jpg'),
('Bakery Bliss', 'New York, USA', 'Artisan bakery with a variety of breads and pastries', 'bakery_bliss.jpg');

-- Dummy data for products
INSERT INTO products (product_name, product_description, product_category, product_price, product_image, product_sustainability_rating, product_producer_id, product_type, is_organic, food_subcategory)
VALUES 
('Organic Apples', 'Fresh organic apples', 'fruits', 3.99, 'organic_apples.jpg', 4.5, (SELECT id FROM producers WHERE producer_name = 'Green Farms'), 'food', TRUE, 'fruits'),
('Whole Milk', 'Fresh whole milk', 'dairy', 2.99, 'whole_milk.jpg', 4.0, (SELECT id FROM producers WHERE producer_name = 'Dairy Delight'), 'food', FALSE, 'dairy'),
('Salmon Fillet', 'Fresh salmon fillet', 'seafood', 12.99, 'salmon_fillet.jpg', 4.8, (SELECT id FROM producers WHERE producer_name = 'Seafood Haven'), 'food', FALSE, 'seafood'),
('Sourdough Bread', 'Artisan sourdough bread', 'bakery', 4.99, 'sourdough_bread.jpg', 4.7, (SELECT id FROM producers WHERE producer_name = 'Bakery Bliss'), 'food', TRUE, 'bakery');