
const core = require("@actions/core")
const exec = require("@actions/exec")

const latex = require('node-latex')
const fs = require('fs')

async function buildLatext(filePath , outputPath){
    const input = fs.createReadStream('main.tex')
    const output = fs.createWriteStream('main.pdf')
    const pdf = latex(input)
    
    pdf.pipe(output)
}

async function run() {

    try {

        const filePath = core.getInput("file-path")
        const src = __dirname

        await buildLatext(filePath , filePath.replace('.tex' , '.pdf'))
        
        await exec.exec(`${src}/build_latex.sh -p ${filePath}`)

    }catch(error){

    }

}

run()
