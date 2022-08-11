# CDK Pipeline for iotkinesislambdastack

## Pre-Run:
1. **Create PAT in Github**

2. **Create Github Secret**
```
aws secretsmanager create-secret --name "github-token" --description "Github Token" --secret-string "<YOUR_TOKEN>"
```
3. **Admin access for Pipeline**
```
cdk bootstrap aws://<YOUR_ACCOUNT_NUMBER>/<REGION> --profile <USERNAME> --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess 
```


**To Run:**
```
cdk bootstrap
cdk deploy
```




## Useful commands
* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template


