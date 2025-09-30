import express from 'express';
import path from "path";
import { fileURLToPath } from "url";
import { setupDatabase, getDbConnection } from './database.js';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files (CSS, images, etc.)
app.use(express.static(__dirname + "/public"));

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Make sure database is ready before starting server
setupDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error("DB setup failed:", err);
  });

// Home / Products page
app.get("/", (req, res) => {
  getDbConnection()
    .then(db => db.all("SELECT * FROM products"))
    .then(products => {
      res.render("pages/products", {
        data: products,
        title: "Our Products"
      });
    })
    .catch(error => {
      console.error("Error fetching products:", error);
      res.status(500).send("Internal Server Error");
    });
});

// About page
app.get("/about", (req, res) => {
  res.render("pages/about", { title: "About Us" });
});

// Contact page
app.get("/contact", (req, res) => {
  res.render("pages/contact", { title: "Contact Us" });
});
