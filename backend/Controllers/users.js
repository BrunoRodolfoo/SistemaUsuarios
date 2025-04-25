import { db } from "../db.js";


// READ
export const getUsers = (_, res) => {
  const q = "SELECT * FROM usuarios";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

// CREATE
export const addUser = (req, res) => {
  const q = "INSERT INTO usuarios(`nome`, `idade`, `cpf`, `email`, `endereco`) VALUES(?)";
  const values = [
    req.body.nome,
    req.body.idade,
    req.body.cpf,
    req.body.email,
    req.body.endereco,
  ];
  db.query(q, [values], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Usuário criado com sucesso.");
  });
};

// UPDATE
export const updateUser = (req, res) => {
  const q = "UPDATE usuarios SET `nome` = ?, `idade` = ?, `cpf` = ?, `email` = ?, `endereco` = ? WHERE `idusuarios` = ?";
  const values = [
    req.body.nome,
    req.body.idade,
    req.body.cpf,
    req.body.email,
    req.body.endereco,
  ];
  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Usuário atualizado com sucesso.");
  });
};

// DELETE
export const deleteUser = (req, res) => {
  const q = "DELETE FROM usuarios WHERE `idusuarios` = ?";
  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Usuário deletado com sucesso.");
  });
};