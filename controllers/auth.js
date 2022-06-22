const  { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');


const crearUsuario = async (req, res = response) => {
    const { email, password} = req.body; 
    try {

        let usuario = await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json({
                ok: false,
                msg: "El correo ya esta en uso"
            })
        }

       usuario = new Usuario(req.body);

       // Encriptar contraseña
         const salt = bcrypt.genSaltSync(10);
         usuario.password = bcrypt.hashSync(password, salt);

        // Guardar usuario
        await usuario.save();

        // Crear token
        const token = await generarJWT(usuario._id, usuario.name);
        
        res.status(201).json({
            ok: true,
            uid: usuario._id,
            name: usuario.name,
            token 
            
        }) 

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg:"hablar con el admin"
        })
    }
}

const loginUsuario = async  (req, res = response) => {

    const {email, password} = req.body;


    try {


        const usuario = await Usuario.findOne({email});

        if(!usuario){
            return res.status(400).json({
                ok: false,
                msg: "El usuario no existe con ese email"
            })
        }

        // Comparar contraseña
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: "El password no es correcto"
            });
        }

        // Crear token

        const token = await generarJWT(usuario._id, usuario.name);
        res.json({
            ok: true,
            uid: usuario._id,
            name: usuario.name,
            token
        })

        
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg:"hablar con el admin"
        });
    }

    
        
}

const revalidarToken = async (req, res = response) => {

    const uid = req.uid;
    const name = req.name;

    const token = await generarJWT(uid, name);
        
        res.json({
            ok: true,
            token
        })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}

