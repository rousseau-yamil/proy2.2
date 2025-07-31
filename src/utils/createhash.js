import bcrypt from 'bcrypt'


exports.createHash      = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
exports.isValidPassword =  (password, userPassword) => bcrypt.compareSync(password, userPassword)