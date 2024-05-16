const database = require("../database.js");

const getAllUsers = (req, res) => {
  database.query(`SELECT * FROM users`, (err, results) => {
    if (err) {
      res.status(500).json({ error: "something wrong" });
      throw err;
    }
    console.log(results);
    res.json({ results });
  });
};

const getUserById = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      error: "Silahkan isi field id user!",
    });
  }
  database.query(`SELECT * FROM users WHERE id = ?`, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        error: "Error While getting user with ID",
      });
    }
    if (results.length === 0) {
      return res.json({
        message: "User Not Found!",
        results: [],
      });
    }
    res.json({ results });
  });
};

const createNewUser = (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      error: "Silahkan isi field name, email, dan password!",
    });
  }

  database.query(
    `INSERT INTO users (name, email, password) VALUES (?, ?,? )`,
    [name, email, password],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          error: "Error while inserting new user!",
        });
      }

      if (results.affectedRows > 0) {
        console.log(results);
        return res.json({
          message: "New User Created!",
        });
      }
      return res.status(500).json({
        error: "No user created!",
      });
    }
  );
};

const updateUserById = (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  if (!id || !name || !email || !password) {
    return res.status(400).json({
      error: "Silahkan isi field id, name, email, dan password!",
    });
  }

  database.query(
    `UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?`,
    [name, email, password, id],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({
          error: "Error While Updating user!",
        });
      }

      console.log(results);

      if (results.affectedRows === 0) {
        return res.status(400).json({
          error: "User dengan ID " + id + " tidak ditemukan, gagal update!",
        });
      }

      return res.json({
        message: "Data user dengan ID " + id + " telah diubah",
      });
    }
  );
};

const deleteUserById = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      error: "Silahkan isi field id user!",
    });
  }
  database.query(`DELETE FROM users WHERE id = ?`, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        error: "Error while deleting user!",
      });
    }

    if (results.affectedRows === 0) {
      return res.status(400).json({
        error: `User dengan ID ${id} tidak ditemukan, gagal dihapus!`,
      });
    }
    res.json({ message: `User dengan ID ${id} telah DIHAPUS!` });
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  createNewUser,
};
