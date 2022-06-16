import * as cdk from "@aws-cdk/core";
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
  CodeBuildStep,
} from "@aws-cdk/pipelines";
import { LambdaBuildStage } from "./stages/lambda-build-stage";
require("dotenv").config();

export class CdkPipelineAppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, "SensiHubServiceStack", {
      pipelineName: "SensiHubServiceStack",
      synth: new ShellStep("Synth", {
      
        input: CodePipelineSource.connection(
          "emersonsoftware/SensiHubService",
          "master",
          { connectionArn: process.env.CODESTAR_CONNECTION_ARN as string }
        ),
        commands: ["dotnet build src ", "cdk deploy --create-change-set"],
      }),
    });
    
     
  }
}
