import {Router} from 'express'
import userModel from '../dao/models/userModel.js'
import bcrypt from 'bcrypt'
import cartModel from '../dao/models/cartModel.js'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import { perfil_auth } from '../middleware/perfil_auth.js'
const router = Router()



// router.post('/register',async(req,res)=>{
// //  router.post('/register', validarCamposTextoConErroresMiddleware(['first_name','last_name','role']),async (req, res)=>{
//     let { first_name, last_name, email, password, role } = req.body
   
//     //console.log(first_name, last_name, email, password)
//     if(!first_name || !email || !password) return res.status(400).send({status: 'success', message: 'deben venir todos los campos requeridos'})

//     let userFound = await userModel.findOne({email})
//     //const userFound = await userModel.getUser({email})
//     //const userFound = await userModel.findOne({email}) 


//     //Control
    
    
//     if(userFound) return res.status(401).send({status: 'error', message: 'El usuario con ese email ya existe'})

//     try {
//         password = bcrypt.hashSync(password,10)
//         let nuevoUsuario = {
//         first_name,
//         last_name, 
//         email,
//         //password: createHash(password), // crear hash
//         password,
//         role,
//         cartID: await cartModel.create({})
//     }

//     let result = await userModel.create(nuevoUsuario)

//     res.send({
//         status: 'Usuario creado con exito',
//         data: result
//     })
//     } catch (error) {
//         console.log(error)
//         res.setHeader('Content-Type','application/json');
//         return res.status(500).json({error:`Internal server error`})
//     }
    
// })


//CON PASSPORT
// router.post('/register',passport.authenticate("registro",{failureRedirect:"/api/sessions/errorreg"}),
// (req,res)=>{
//     res.setHeader('Content-type','application/json')    
//     return res.status(201).json({message:`Registro exitoso para ${req.user.first_name}`,nuevoUsuario:req.user})})

// router.post('/login',passport.authenticate('login',{failureRedirect:"/api/sessions/error"}),(req,res)=>{
//     //session
//     // req.session.usuario = req.user
//     let token = jwt.sign(usuario,"Coder2025JSII",{expire}) 
//     res.setHeader('Content-Type','application/json')
//     return res.status(200).json({message:`Login exitoso para ${req.user.first_name}`,usuarioLogueado:req.user})
// })

//--------------------
//NORMAL
// router.post('/login',async(req,res)=>{
//     let {email, password} = req.body
//     console.log('entra')
//     if(!email || !password){
//         res.setHeader('Content-Type', 'application/json')
//         return res.status(400).json({error:`email | password son requeridos`})
//     }
//     try {
//         //documento hidratado
//         let usuario = await userModel.findOne({email}).lean()
//         if(!usuario){
//             res.setHeader('Content-Type', 'application/json')
//             return res.status(401).json({error:`Unauthorized - creds invalidas`})
//         }
//         if(!bcrypt.compareSync(password,usuario.password)){
//             res.setHeader('Content-Type', 'application/json')
//             return res.status(401).json({error:`Unauthorized - creds invalidas`})
//         }

//         console.log(Object.keys(usuario))
        
//         //eliminamos datos sensibles
//         delete usuario.password
//         delete usuario.atCreated
//         //delete usuario.updateAt
//         console.log(usuario)
        
//         req.session.usuario = usuario
        
//         //session

//         res.setHeader('Content-Type', 'application/json')
//         return res.status(200).json({error:`Login exitoso`})
//     }catch(error){
//         res.setHeader('Content-Type', 'application/json')
//         console.log(error)
//         return res.status(500).json({error:`Internal server Error`})
//     }
// })
// router.post('/register',async(req,res)=>{
// //  router.post('/register', validarCamposTextoConErroresMiddleware(['first_name','last_name','role']),async (req, res)=>{
//     let { first_name, last_name, email, password, role } = req.body
   
//     //console.log(first_name, last_name, email, password)
//     if(!first_name || !email || !password) return res.status(400).send({status: 'success', message: 'deben venir todos los campos requeridos'})

//     let userFound = await userModel.findOne({email})
//     //const userFound = await userModel.getUser({email})
//     //const userFound = await userModel.findOne({email}) 


//     //Control
    
    
//     if(userFound) return res.status(401).send({status: 'error', message: 'El usuario con ese email ya existe'})

//     try {
//         password = bcrypt.hashSync(password,10)
//         let nuevoUsuario = {
//         first_name,
//         last_name, 
//         email,
//         //password: createHash(password), // crear hash
//         password,
//         role,
//         cartID: await cartModel.create({})
//     }

//     let result = await userModel.create(nuevoUsuario)

//     res.send({
//         status: 'Usuario creado con exito',
//         data: result
//     })
//     } catch (error) {
//         console.log(error)
//         res.setHeader('Content-Type','application/json');
//         return res.status(500).json({error:`Internal server error`})
//     }
    
// })-
//------------------------------------


router.post('/login',async(req,res)=>{
    let {email, password} = req.body
    //
    if(!email || !password){
        res.setHeader('Content-Type', 'application/json')
        return res.status(400).json({error:`email | password son requeridos`})
    }
    try {
        //documento hidratado
        let usuario = await userModel.findOne({email}).lean()
        if(!usuario){
            res.setHeader('Content-Type', 'application/json')
            return res.status(401).json({error:`Unauthorized - creds invalidas`})
        }
        if(!bcrypt.compareSync(password,usuario.password)){
            res.setHeader('Content-Type', 'application/json')
            return res.status(401).json({error:`Unauthorized - creds invalidas`})
        }

        //console.log(Object.keys(usuario))
        
        //eliminamos datos sensibles
        delete usuario.password
        delete usuario.atCreated
        //delete usuario.updateAt
        console.log(usuario)
        
        req.session.usuario = usuario
        let token = jwt.sign(usuario,'Coder2025JSII',{expiresIn:'1h'})        
        res.cookie("cookieToken", token, { httpOnly: true })
        //session

        res.setHeader('Content-Type', 'application/json')
        // return res.status(200).json({error:`Login exitoso`})
        return res.status(200).json({usuarioLogueado:usuario,token})
    }catch(error){
        res.setHeader('Content-Type', 'application/json')
        console.log(error)
        return res.status(500).json({error:`Internal server Error`})
    }
})


router.post('/register',async(req,res)=>{
//  router.post('/register', validarCamposTextoConErroresMiddleware(['first_name','last_name','role']),async (req, res)=>{
    let { first_name, last_name, email, password, role } = req.body
   
    //console.log(first_name, last_name, email, password)
    if(!first_name || !email || !password) return res.status(400).send({status: 'success', message: 'deben venir todos los campos requeridos'})

    let userFound = await userModel.findOne({email})
    //const userFound = await userModel.getUser({email})
    //const userFound = await userModel.findOne({email}) 


    //Control
    
    
    if(userFound) return res.status(401).send({status: 'error', message: 'El usuario con ese email ya existe'})

    try {
        password = bcrypt.hashSync(password,10)
        let nuevoUsuario = {
        first_name,
        last_name, 
        email,
        //password: createHash(password), // crear hash
        password,
        role,
        cartID: await cartModel.create({})
    }

    let result = await userModel.create(nuevoUsuario)

    res.send({
        status: 'Usuario creado con exito',
        data: result
    })
    } catch (error) {
        console.log(error)
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`Internal server error`})
    }
    
})

//ERRORES


router.get('/error',(req,res)=>{
    res.setHeader('Content-Type','application/json')
    return res.status(401).json({error:`No autorizado credenciales invalidas`})
})


router.get('/errorreg',(req,res)=>{
    res.setHeader('Content-Type','application/json')
    return res.status(401).json({error:`Debe ingresar todos los datos obligatorios`})
})

//con sesiones
// router.get("/logout", (req, res)=>{    
//     req.session.destroy(e=>{
//         if(e){
//             res.setHeader('Content-Type','application/json');
//             return res.status(500).json({error:`Error al procesar Logout`})
//         }

//         res.setHeader('Content-Type','application/json');
//         return res.status(200).json({message:"Logout exitoso"});
//     })
// })



//CON JWT
router.get('/logout', (req, res) => {
  res.clearCookie('cookieToken'); // elimina la cookie del token JWT
  res.status(200).json({ message: 'Logout exitoso' });
});


//RUTAS ESPECIFICAS

router.get('/usuario',    
    passport.authenticate('current',{session:false}),
    perfil_auth(["user","admin","client"]),
    async(req,res)=>{
    res.setHeader('Content-type','application/json')
    
    res.status(200).json({
        mensaje:'Perfil de:'+ req.user.first_name,
        datos:`email:${req.user.email}`
    })
})
router.get('/current',
    passport.authenticate('current',{session:false}),
    async(req,res)=>{
    res.setHeader('Content-type','application/json')
    
    res.status(200).json({
        mensaje:'Perfil de:'+ req.user.first_name,
        datos:`email:${req.user.email}`
    })
})
router.get('/admin',
    passport.authenticate('current',{session:false}),
    perfil_auth(["admin"]),
    async(req,res)=>{
    res.setHeader('Content-type','application/json')
    
    res.status(200).json({
        mensaje:'Perfil de:'+ req.user.first_name,
        datos:`email:${req.user.email}`
    })
})
router.get('/cliente',
    passport.authenticate('current',{session:false}),
    perfil_auth(["client"]),
    async(req,res)=>{
    res.setHeader('Content-type','application/json')
    
    res.status(200).json({
        mensaje:'Perfil de:'+ req.user.first_name,
        datos:`email:${req.user.email}`
    })
})


export default router;