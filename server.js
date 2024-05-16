const express = require("express");
const app = express();
const database = require("./database");
const userController = require("./controllers/userController");
const errorhanlder = require("./middleware/errorHandler");
const logger = require("./middleware/logger");
const upload = require("./utils/upload");
const multerError = require("./middleware/multerError");
const userRoutes = require("./routes/userRoutes");

const PORT = 8000;

// Middleware
// Ambil data dari client yang dikirim berbentuk json
app.use(express.json());

// Menangangi data dari client atau browser
app.use(express.urlencoded({ extended: true }));

// Manangani ERROR
app.use(errorhanlder);

app.use(logger);
// // ROUTE http://localhost:8000/
// // METHOD GET
// app.get("/", (req, res) => {
//   res.json({
//     message: "Berhasil melakukan routing✨",
//   });
// });

// // ROUTING Users
// // Ambil data semua users
// app.get("/api/users", userController.getAllUsers);

// // METHOD POST MENAMBAHKAN DATA USER BARU
// app.post("/api/users", userController.createNewUser);

// // PUT METHOD Mengupdate data user sesuai dengan ID-nya
// app.put("/api/users/:id", userController.updateUserById);

// // METHOD DELETE untuk menghapus user
// app.delete("/api/users/:id", userController.deleteUserById);

// // METHOD GET dengan paramter id
// app.get("/api/users/:id", userController.getUserById);

// FILE UPLOAD

// METHOD GET
app.get("/", (req, res) => {
  res.json({
    message: "Berhasil melakukan routing✨",
  });
});

app.use("/api/users", userRoutes);
app.post("/file-upload", upload.single("file"), [multerError], (req, res) => {
  res.json({ message: "File uploaded!" });
});

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
