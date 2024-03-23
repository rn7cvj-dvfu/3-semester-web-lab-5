import * as core from "@actions/core";

export interface Inputs {
  readonly repoToken: string;
  readonly files: string[];
}

export class CoreInputs implements Inputs {
  get repoToken(): string {
    const token = core.getInput("repo-token");
    return token;
  }

  get files(): string[] {
    const dataPath = process.env.GITHUB_WORKSPACE;

    const filesStr: string = core.getInput("files");

    const fileArr: string[] = filesStr
      .split(", ")
      .map((file) => `${dataPath}/${file}`);
    return fileArr;
  }
}
