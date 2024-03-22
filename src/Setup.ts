import * as exec from '@actions/exec'

export async function setup() {

    console.log("Installing pdflatex")
    const src = __dirname

    exec.exec(`${src}/setup.sh`)

}