import passport from 'passport'
import local from 'passport-local'
import passportJWT from 'passport-jwt'

const findToken=req=>{
    let token = null
    if(req.cookies.cookieToken) token=req.cookies.cookieToken
    return token
}


export const iniciarJWTPassport=()=>{
    passport.use('current',
        new passportJWT.Strategy(
            {
                secretOrKey:'Coder2025JSII',
                jwtFromRequest:passportJWT.ExtractJwt.fromExtractors([findToken])
            },
            async(usuario, done)=>{
                try {
                    return done(null,usuario)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )
}



// export const iniciarPassport=()=>{
//     passport.use('current',
//         new passportJWT.Strategy(
//             {},
//             async(done)=>{
//                 try {
                    
//                 } catch (error) {
//                     return done(error)
//                 }
//             }
//         )
//     )

// }