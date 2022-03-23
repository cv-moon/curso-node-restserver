const { Router } = require("express");
const { check } = require("express-validator");
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosPatch,
} = require("../controllers/usuarios");
const {
  esRolValido,
  emailExiste,
  existeUsuarioPorId,
} = require("../helpers/db-validators");

// const { validarCampos } = require("../middlewares/validar-campos");
// const { validarJWT } = require("../middlewares/validar-jwt");
// const { esAdminole, tieneRole } = require("../middlewares/validar-roles");

const {
  validarCampos,
  validarJWT,
  esAdminole,
  tieneRole,
} = require("../middlewares");

const router = Router();

router.get("/", usuariosGet);
router.post(
  "/",
  [
    check("nombre", ' "El nombre es obligatorio').not().isEmpty(),
    check(
      "password",
      ' "El password es obligatorio y más de 6 caracteres'
    ).isLength({ min: 6 }),
    check("correo", ' "El correo no es válido').isEmail(),
    check("correo").custom(emailExiste),
    // check("rol", ' "No es un rol permitido').isIn(["ADMIN_ROL", "USER_ROL"]),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  usuariosPost
);
router.put(
  "/:id",
  [
    check("id", " No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  usuariosPut
);
router.delete(
  "/:id",
  [
    validarJWT,
    // fUERZA A SOLO UN TIPO DE ROL
    // esAdminole,
    // VARIOS ROLES
    tieneRole("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", " No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuariosDelete
);
router.patch("/", usuariosPatch);

// router.get("/", (req, res) => {
//   res.json({
//     msg: "get API",
//   });
// });

// router.put("/", (req, res) => {
//   res.json({
//     msg: "put API",
//   });
// });

// router.post("/", (req, res) => {
//   res.json({
//     msg: "post API",
//   });
// });

// router.delete("/", (req, res) => {
//   res.json({
//     msg: "delete API",
//   });
// });

// router.patch("/", (req, res) => {
//   res.json({
//     msg: "patch API",
//   });
// });

module.exports = router;
