const express = require("express");
const app = express();
const database = require("./database");

const PORT = 8000;

// Middleware
// Ambil data dari client yang dikirim berbentuk json
app.use(express.json());

// Menangangi data dari client atau browser
app.use(express.urlencoded({ extended: true }));

// ROUTE http://localhost:8000/
// METHOD GET
app.get("/", (req, res) => {
  res.json({
    message: "Berhasil melakukan routing✨",
  });
});

// ROUTING Users
// Ambil data semua users
app.get("/api/users", (req, res) => {
  database.query(`SELECT * FROM users`, (err, results) => {
    if (err) {
      res.status(500).json({ error: "something wrong" });
      throw err;
    }
    console.log(results);
    res.json({ results });
  });
});

// METHOD POST MENAMBAHKAN DATA USER BARU
app.post("/api/users", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      error: "Silahkan isi field name, email, dan password!",
    });
  }
  res.json({
    name: name,
    email: email,
    password: password,
    message: "User telah ditambahkan!",
  });
});

// PUT METHOD Mengupdate data user sesuai dengan ID-nya
app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  if (!id || !name || !email || !password) {
    return res.status(400).json({
      error: "Silahkan isi field id, name, email, dan password!",
    });
  }
  res.json({
    message: "data user dengan id " + id + " Telah diubah",
    name: name,
    email: email,
    password: password,
  });
});

// METHOD DELETE untuk menghapus user
app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      error: "Silahkan isi field id user!",
    });
  }

  res.json({ message: `User dengan ID ${id} telah DIHAPUS!` });
});

// METHOD GET dengan paramter id
app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      error: "Silahkan isi field id user!",
    });
  }
  res.json({
    data: {
      name: "Letty",
      email: "letty@gmail.com",
      password: "password",
    },
  });
});

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
