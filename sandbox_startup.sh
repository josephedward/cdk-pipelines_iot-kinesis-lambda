export AWS_PROFILE=cloud_user
aws secretsmanager create-secret --name "github-token" --description "Github Token" --secret-string "$1"
cdk bootstrap aws://$2/us-east-1 --profile cloud_user --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess 
