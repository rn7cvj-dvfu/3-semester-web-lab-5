import * as exec from '@actions/exec'

export async function setup() {

    const src = __dirname

    exec.exec(`${src}/setup.sh`)

}