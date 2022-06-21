const  { response } = require('express');
const Usuario = require('../models/usuario');


const crearUsuario = async (req, res = response) => {
    /* const {name, email, password} = req.body; */
    
    const usuario = new Usuario(req.body);
    await usuario.save()
    
    res.status(201).json({
        ok: true,
        message: 'registro exitoso',
        
    }) 
}

const loginUsuario = (req, res = response) => {

    const {email, password} = req.body;
 
        
        res.json.status(201)({
            ok: true,
            message: 'login exitoso',
            email,
            password
        }) 
}

const revalidarToken = (req, res = response) => {
        
        res.json({
            ok: true,
            message: 'renew'
        })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}

