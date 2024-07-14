/* eslint-disable max-len */
const express = require("express");
const { obtenerEmpresas } = require("../../controllers/combos/empresas");
const { obtenerSedes } = require("../../controllers/combos/sedes");
const { obtenerTiposId } = require("../../controllers/combos/tiposId");
const { obtenerTiposNovedad } = require("../../controllers/combos/tiposNovedad");
const { obtenerServicios } = require("../../controllers/combos/servicios");
const { obtenerResponsables } = require("../../controllers/combos/responsables");

const router = express.Router();

// combos locacion
// const { seguridad } = require("../../middleware/seguridad");

router.route("/empresas").get(obtenerEmpresas);
router.route("/sedes").get(obtenerSedes);
router.route("/tipos-id").get(obtenerTiposId);
router.route("/tipos-novedad").get(obtenerTiposNovedad);
router.route("/servicios").get(obtenerServicios);
router.route("/responsables").get(obtenerResponsables);

module.exports = router;
