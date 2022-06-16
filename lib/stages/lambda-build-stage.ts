import { Stage, Construct, StageProps } from "@aws-cdk/core";

//***********Import the resource stack***********
import {LambdaBuildStack} from "../stacks/lambda-build-stack";

export class LambdaBuildStage extends Stage {
	constructor(scope: Construct, id: string, props?: StageProps) {
		super(scope, id, props);

		//***********Instantiate the resource stack***********
		new LambdaBuildStack(this, `LambdaBuildStack`);
	}
}