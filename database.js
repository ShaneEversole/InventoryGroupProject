import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const setupDatabase = () => {
  return open({
    filename: './public/database/store.db',
    driver: sqlite3.Database
  }).then(db => {
    return db.exec(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        category TEXT,
        size TEXT,
        color TEXT,
        price REAL,
        stock INTEGER,
        image_url TEXT
      )
    `).then(() => {
      // check if table is empty
      return db.get(`SELECT COUNT(*) as count FROM products`);
    }).then(row => {
      if (row.count === 0) {
        // seed products only once
        return db.exec(`
          INSERT INTO products (name, category, size, color, price, stock, image_url) 
          VALUES
          ('Classic T-Shirt', 'Tops', 'M', 'White', 14.99, 120, '/images/tshirt.jpg'),
          ('Slim Fit Jeans', 'Bottoms', '32', 'Dark Blue', 49.99, 60, '/images/jeans.jpg'),
          ('Hoodie Pullover', 'Outerwear', 'L', 'Black', 34.99, 75, '/images/hoodie.jpg'),
          ('Leather Jacket', 'Outerwear', 'M', 'Brown', 129.99, 20, '/images/jacket.jpg'),
          ('Summer Dress', 'Dresses', 'S', 'Green Floral', 39.99, 45, '/images/dress.jpg'),
          ('Formal Blazer', 'Outerwear', 'L', 'Navy Blue', 89.99, 30, '/images/blazer.jpg'),
          ('Cargo Shorts', 'Bottoms', 'M', 'Khaki', 29.99, 90, '/images/shorts.jpg'),
          ('Polo Shirt', 'Tops', 'XL', 'Green', 24.99, 100, '/images/polo.jpg'),
          ('Wool Sweater', 'Tops', 'M', 'Grey', 54.99, 40, '/images/sweater.jpg'),
          ('Running Sneakers', 'Footwear', '10', 'White/Blue', 69.99, 55, '/images/sneakers.jpg')
        `);
      }
    }).then(() => {
      console.log("Products database setup complete ✅");
    });
  });
};

export const getDbConnection = () => {
  return open({
    filename: './public/database/store.db',
    driver: sqlite3.Database
  });
};
