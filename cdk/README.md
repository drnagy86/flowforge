# The CDK Project

# Log on to AWS Console
```
aws sso login --profile personal
```

# Deploy the stack
* if first time,
```
npx cdk bootstrap --profile personal
```

Run
```
npx cdk deploy --profile personal --all
```
Should probably build front end distro first...


AWS wonkiness- Only us-east-1 can have make certificates, but can't deploy and pass values by cdk.
So, two step for making certs the first and only the first time
```
npx cdk bootstrap aws://<ACCOUNT_NUMBER>/us-east-1 --profile personal
npx cdk deploy FlowForgeCertStack --profile personal
npx cdk deploy FlowForgeStaticSiteStack --profile personal
```
After that, the cert arn is saved in parameter store and doesn't need to be updated


# Seed Admin User Manually if first deploy
Don't forget to create the initial admin user in Cognito manually if this is the first deployment.
Adjust the temporary password when using this command.
```
aws cognito-idp admin-create-user \
  --user-pool-id us-east-2_QMLJskyI3 \
  --username admin@flowforge.com \
  --user-attributes Name=email,Value=admin@flowforge.com \
  --message-action SUPPRESS \
  --temporary-password ********** \
  --profile personal \
  --region us-east-2

```

Then set a permanent password for the user in the Cognito console.
Don't forget to update the password in the command below.
```
aws cognito-idp admin-set-user-password \
  --user-pool-id us-east-2_QMLJskyI3 \
  --username admin@flowforge.com \
  --password ********** \
  --permanent \
  --profile personal \
  --region us-east-2

```