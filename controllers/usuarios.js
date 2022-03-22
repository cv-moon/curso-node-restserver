const { response } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");
const { existeEmail } = require("../helpers/db-validators");
const usuario = require("../models/usuario");

const usuariosGet = async (req, res = response) => {
  // const { q, nombre, apikey } = req.query;
  const { limit = 5, from = 0 } = req.query;
  const query = { estado: true };
  // const usuarios = await Usuario.find(query)
  //   .skip(Number(from))
  //   .limit(Number(limit));
  // const total = await Usuario.countDocuments(query);

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(from)).limit(Number(limit)),
  ]);
  res.json({
    // resp,
    total,
    usuarios,
  });
};

const usuariosPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //Guardar en DB

  await usuario.save();
  res.json({
    usuario,
  });
};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { password, google, ...resto } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json({
    usuario,
  });
};

const usuariosDelete = async (req, res = response) => {
  const { id } = req.params;

  // Borrado físico
  // const usuario = await Usuario.findByIdAndDelete(id);

  // Borrado Lógico
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
  res.json({
    usuario,
  });
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch API - controlador",
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosPatch,
};
