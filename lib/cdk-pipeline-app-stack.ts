import * as cdk from "@aws-cdk/core";
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from "@aws-cdk/pipelines";

export class CdkPipelineAppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const pipeline = new CodePipeline(this, "CdkPipelineAppStack", {
      pipelineName: "CdkPipelineAppStack",
      synth: new ShellStep("Synth", {
        input: CodePipelineSource.gitHub(
          "josephedward/iot-kinesis-lambda-app",
          "sandbox"
        ),
        commands: ["npm ci", "npm run build", "npx cdk synth --verbose"],
      }),
    });
  }
}
