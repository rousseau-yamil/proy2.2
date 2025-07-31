// // console.log("pid",process)
// // console.log("cwd",process.cwd())
// // console.log("Uso de memoria",process.memoryUsage)
// console.log("Argumentos",process.argv)
// // console.log("Variable de entorno",process.env)

// // const [dirNode,dirScript, ...argumentos] = process.argv
// const [,, ...argumentos] = process.argv
// console.log(argumentos)


// let indicePort = argumentos.lastIndexOf(a=>a=="--port")
// if(indicePort==-1){
//     console.log(`El puerto es necesario`,)
//     process.exit()
// }


import {Command,Option} from "commander"
const program = new Command()

//Nombre corto, largo, descripcion y valor por defecto

program.option("-p,--port <PORT>","Puerto donde se escuchara el servidor",3000)
program.option("-d, --debug","Activa modo DEBUG",false)

const [,,...argumentos] = process.argv
let indiceMode = argumentos.findIndex(a=>a=="--mode")
if(indiceMode!=-1){

}

program.addOption(new Option("-m, --mode <MODE>","Modo de ejecucion del script").choices(["prod","dev","test"]).default("prod"))

program.allowUnknownOption() //permite comandos desconocidos
program.allowExcessArguments()  //permite exceso de comanmdos

program.parse()

const opts = program.opts()
console.log("-opts",opts)

//INFORMACION DE EJECUCION --> node index.js --mode prod --debug --port 3003
// CONTROLAR ENTREGA FINAL

