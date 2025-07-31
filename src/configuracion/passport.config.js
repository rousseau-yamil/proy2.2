import passport from "passport"
import local from "passport-local"
import userModel from "../dao/models/userModel.js"
import bcrypt from "bcrypt"

export const iniciarPassport = () => {
    passport.use('registro',
        new local.Strategy(
            {
                usernameField: "email",
                passReqToCallback: true
            },
            async (req, username, password, done) => {
                try {
                    let { first_name, last_name } = req.body
                    if (!first_name || !last_name) {
                        return done(null, false)
                    }
                    //validaciones
                    password = bcrypt.hashSync(password, 10)
                    let nuevoUsuario = await userModel.create({
                        first_name, last_name, email: username, password
                    })
                    return done(null, nuevoUsuario)
                    // done(null,false) | return done(null,nuevousuario)
                } catch (error) {
                    return done(error) //hubo error
                }
            }
        )
    )

    passport.use('login',
        new local.Strategy(
            { usernameField: "email" },
            async (username, password, done) => {
                try {
                    let usuario = await userModel.findOne({ email:username }).lean()
                    if (!usuario) {
                        // res.setHeader('Content-Type', 'application/json')
                        // return res.status(401).json({ error: `Unauthorized - creds invalidas` })
                        return done(null,false)
                    }
                    if (!bcrypt.compareSync(password, usuario.password)) {
                        // res.setHeader('Content-Type', 'application/json')
                        // return res.status(401).json({ error: `Unauthorized - creds invalidas` })
                        return done(null,false)
                    }
                    delete usuario.password
                    delete usuario.atCreated

                    return done(null, usuario)
                } catch (error) {
                    return done()
                }
            })
    )
    passport.serializeUser((usuario, done) => {
        return done(null, usuario._id)
    })
    passport.deserializeUser(async (id, done) => {
        let usuario = await userModel.findOne({ _id: id })
        return done(null, usuario)
    })
}

// export const iniciarPassport=()=>{
//     passport.use('registro',
//         new local.Strategy(
//             {
//                 usernameField: "email",
//                 passReqToCallback: true
//             },
//             async(done)=>{
//                 try {
//                     // done(null,false) | return done(null,nuevousuario)
//                 } catch (error) {
//                     return done(error) //hubo error
//                 }
//             }
//         )
//     )
// }