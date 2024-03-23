import * as core from "@actions/core";
import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";

export type CreateReleaseResponse =
  RestEndpointMethodTypes["repos"]["createRelease"]["response"];
export type UploadArtifactResponse =
  RestEndpointMethodTypes["repos"]["uploadReleaseAsset"]["response"];

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
      this.uploadArtifacts(artifact, releaseId, uploadUrl).finally(() =>
        console.log(`Upload ${artifact.name}`),
      ),
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

  private async uploadArtifacts(
    artifact: Artifact,
    releaseId: number,
    uploadUrl: string,
  ): Promise<UploadArtifactResponse> {
    return this.git.rest.repos.uploadReleaseAsset({
      url: uploadUrl,
      headers: {
        "content-length": artifact.contentLength,
        "content-type": artifact.contentType,
      },
      data: artifact.readFile() as any,
      name: artifact.name,
      owner: this.context.owner,
      release_id: releaseId,
      repo: this.context.repo,
    });
  }
}
