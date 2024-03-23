import * as core from "@actions/core";
import * as github from "@actions/github";

import { Inputs, CoreInputs } from "./Inputs";
import { setup } from "./Setup";
import { ILatexFile, LatexFile } from "./LatexFile";
import { Releaser } from "./Releaser";
import { Context } from "./Context";
import { Artifact } from "./Artifact";
import { exec } from "@actions/exec";

async function run() {
  await setup();

  exec(`${__dirname}/list_files.sh`);

  const inputs: Inputs = new CoreInputs();

  // Generate latex files
  const latexFiles: ILatexFile[] = inputs.files.map(
    (filePath) => new LatexFile(filePath),
  );

  latexFiles.forEach(async (latexFile) => await latexFile.build());

  const artifacts: Artifact[] = latexFiles.map(
    (latexFile) => new Artifact(latexFile.outputFilePath),
  );

  exec(`${__dirname}/list_files.sh`);

  core.info("Files generated:");

  for (const artifact of artifacts) {
    core.info(
      `File - ${artifact.name}, size - ${artifact.contentLength} bytes`,
    );
  }

  // Create relese
  const git = github.getOctokit(inputs.repoToken);

  const context = new Context();
  const resleaser: Releaser = new Releaser(git, context, artifacts);

  await resleaser.perform();
}

run().catch((error) => core.setFailed(error.message));
