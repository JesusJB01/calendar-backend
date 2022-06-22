/* Rutas de Usuarios /auth 
host +api/auth*/


const {Router}= require('express');
const {check} = require("express-validator");
const router = Router();
const { validarCampos } = require('../middlewares/validar-campos');

const {crearUsuario, loginUsuario, revalidarToken} = require('../controllers/auth');
const {validarJWT} = require('../middlewares/validar-jwt');


router.post('/new', 
[   //middleware que se ejecuta antes de ejecutar la funcion
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isLength({min: 6}),
    validarCampos
], 
crearUsuario)


router.post('/', 
[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isLength({min: 6}),
    validarCampos
], 
loginUsuario)

router.get('/renew', validarJWT ,revalidarToken)


module.exports = router;