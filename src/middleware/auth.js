// export const auth=(req,res,next)=>{
//     if(!req.session.usuario){
//         res.setHeader('Content-type','application/json')
//         return res.status(401).json({error:`No existe usuario autenticados`})
//     }
//     next()
// }

export const requireLogin=(req, res, next)=> {
  if (!req.session.usuario) {
    res.redirect('/login')
    return res.status(401).json({ error: "No autorizado" });
  }  
  next();
}
export const requireAdminLogin=(req, res, next)=>{
  if (req.session.usuario !== 'admin') {
    return res.status(401).json({ error: "No eres administrador" });
  }
  next();
}

