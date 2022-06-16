import { Construct, Stack, StackProps } from "@aws-cdk/core";
import { Pipeline, Artifact } from "@aws-cdk/aws-codepipeline";
import {
  CodeCommitSourceAction,
  GitHubSourceAction,
  CodeBuildAction,
} from "@aws-cdk/aws-codepipeline-actions";
import { PipelineProject } from "@aws-cdk/aws-codebuild";
import {
  SlackApprovalAction,
  SlackNotifier,
} from "@cloudcomponents/cdk-codepipeline-slack";
import { SecretValue } from "@aws-cdk/core";
import { GitHubTrigger, ManualApprovalAction } from "@aws-cdk/aws-codepipeline-actions";
import { Role, ServicePrincipal,PolicyStatement,  } from "@aws-cdk/aws-iam";

require("dotenv").config();

export class CodePipelineSlackApprovalStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const sourceArtifact = new Artifact();

    const sourceAction = new GitHubSourceAction({
      actionName: "Github_Source",
      output: sourceArtifact,
      owner: "emersonsoftware",
      repo: "example_cdk",
      branch: "main",
      oauthToken: SecretValue.secretsManager("github-token"),
      variablesNamespace: "MyNamespace", // optional - by default, a name will be generated for you
    });


    const project = new PipelineProject(this, "MyProject");

    const buildAction = new CodeBuildAction({
      actionName: "CodeBuild",
      project,
      input: sourceArtifact,
      
    });

    const slackBotToken = process.env.SLACK_BOT_TOKEN as string;
    const slackSigningSecret = process.env.SLACK_SIGNING_SECRET as string;
    const slackChannel = process.env.SLACK_CHANNEL_NAME as string;

    const approvalAction = new SlackApprovalAction({
      actionName: "SlackApproval",
      slackBotToken,
      slackSigningSecret,
      slackChannel,
      additionalInformation:
        "Would you like to promote the build to production?",
    });

    const pipeline = new Pipeline(this, "MyPipeline", {
      pipelineName: "MyPipeline",
      stages: [
        {
          stageName: "Source",
          actions: [sourceAction],
        },
        {
          stageName: "Build",
          actions: [buildAction],
        },
        {
          stageName: "Approval",
          actions: [approvalAction],
        },
      ],
    });

    new SlackNotifier(this, "SlackNotifier", {
      pipeline,
      slackBotToken,
      slackSigningSecret,
      slackChannel,
    });
  }
}
