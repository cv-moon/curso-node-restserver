const { Router } = require("express");
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosPatch,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", usuariosGet);
router.post("/", usuariosPost);
router.put("/:id", usuariosPut);
router.delete("/", usuariosDelete);
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
