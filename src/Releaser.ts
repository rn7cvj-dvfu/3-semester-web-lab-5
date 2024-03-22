import * as core from "@actions/core";
import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";

export type CreateReleaseResponse =
  RestEndpointMethodTypes["repos"]["createRelease"]["response"];

import { Inputs } from "./Inputs";
import { GitHub } from "@actions/github/lib/utils";
import { IContext } from "./Context";
import { Artifact } from "./Artifact";

export class Releaser {
  private git: InstanceType<typeof GitHub>;
  private context: IContext;
  private artifacts: Artifact[];

  constructor(git: InstanceType<typeof GitHub>, context: IContext, artifacts) {
    this.git = git;
    this.context = context;
    this.artifacts = artifacts;
  }

  public async perform(): Promise<void> {
    const releaseResponse = await this.createRelease();

    const releaseData = releaseResponse.data;
    const releaseId = releaseData.id;
    const uploadUrl = releaseData.upload_url;

    const artifactsPromise = this.artifacts.map((artifact) =>
      this.uploadArtifacts(artifact),
    );

    await Promise.all(artifactsPromise);
  }

  private async createRelease(): Promise<CreateReleaseResponse> {
    return this.git.rest.repos.createRelease({
      repo: this.context.repo,
      owner: this.context.owner,
      tag_name: this.context.tag,
    });
  }

  private async uploadArtifacts(artifact: Artifact) {}
}