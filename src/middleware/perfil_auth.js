export const perfil_auth=(permisos=[])=>{
    return (req,res,next)=>{
        permisos = permisos.map(p=>p.toLowerCase())
        console.log(req.user)
        if(permisos.includes("public")) return next()
    
        if(!permisos.includes( req.user.role)){
            res.setHeader('Content-Type','application/json')
            return res.status(403).json({error:`No tiene privilegios suficientes para acceder al recurso`})
        }
        next()
    }
}