import * as core from "@actions/core";
import { exec } from "@actions/exec";

export async function setup() {
  core.info("Installing pdflatex");

  await exec(`${__dirname}/setup.sh`);

  core.info("Installing complete");
}
