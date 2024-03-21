
const core = require("@actions/core")
const exec = require("@actions/exec")


async function run() {

    try {

        const filePath = core.getInput("file-path")
        const src = __dirname
        
        await exec.exec(`${src}/build_latex.sh -v ${filePath}`)

    }catch(error){

    }

}

fun()