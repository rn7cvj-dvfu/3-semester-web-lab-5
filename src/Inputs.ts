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
    const filesStr: string = core.getInput("files");
    const fileArr: string[] = filesStr.split(", ");

    fileArr.forEach((file) => {
      file = `${__dirname}/${file}`;
    });

    return fileArr;
  }
}
