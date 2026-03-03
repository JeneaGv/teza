CREATE TABLE stickers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT,
    category VARCHAR(50)
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(100) NOT NULL,
    customer_address TEXT NOT NULL,
    sticker_id INT REFERENCES stickers(id),
    quantity INT DEFAULT 1,
    status VARCHAR(20) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO stickers (name, price, image_url, category) VALUES 
('Hacker Neon', 5.99, 'https://placehold.co/150x150?text=Hacker', 'Tech'),
('Cyberpunk Cat', 4.50, 'https://placehold.co/150x150?text=Cat', 'Art'),
('Pixel Heart', 3.20, 'https://placehold.co/150x150?text=Heart', 'Retro'),
('Vaporwave Sunset', 6.00, 'https://placehold.co/150x150?text=Sunset', 'Vibe');
