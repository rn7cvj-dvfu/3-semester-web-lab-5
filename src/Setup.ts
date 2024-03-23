import * as core from "@actions/core";
import * as exec from "@actions/exec";

export async function setup() {
  core.info("Installing pdflatex");
  const src = __dirname;

  await exec.exec(`${src}/setup.sh`);

  core.info("Installing complete");
}
