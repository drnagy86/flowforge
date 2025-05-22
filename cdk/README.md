# FlowForge CDK – Infrastructure

This CDK project defines the infrastructure for the **FlowForge** web app and the **Dev Portfolio** site. It uses AWS CDK in TypeScript to provision all resources including authentication, storage, static hosting, serverless compute, certificates, and routing.

---

## 🔧 Project Scope

This repo manages:

- Infrastructure for the full-stack **FlowForge** app (Cognito, Lambda, GraphQL, DynamoDB)
- Static site deployment for the **Dev Portfolio** (derricknagy.dev)
- Certificate management and domain routing
- Optional root redirect setup

All stacks are modular and can be deployed independently. Certificate stacks are separated due to AWS region restrictions.

---

## ⚙️ Local AWS Setup

```bash
# Log into AWS
aws sso login --profile personal
```

```bash
# Optional (Set default profile for terminal session)
export AWS_PROFILE=personal
```

---

## 🚀 First-Time Deployment

If this is the first time deploying:

```bash
npx cdk bootstrap --profile personal
```

Build your frontend assets (FlowForge + Dev Portfolio) **before** deploying the full stack.

---

## 🌐 Certificate Handling (One-Time Setup)

AWS only allows certificate creation for CloudFront in `us-east-1`.

If this is your first deploy and you need certs:

```bash
# Bootstrap us-east-1 for cert creation
npx cdk bootstrap aws://<ACCOUNT_NUMBER>/us-east-1 --profile personal

# Deploy cert and static site stacks separately
npx cdk deploy FlowForgeCertStack --profile personal
npx cdk deploy FlowForgeStaticSiteStack --profile personal
```

The cert ARN will be saved to Parameter Store for reuse. You don’t need to redeploy cert stacks after the first time unless rotating certs.

---

## 📦 Deploy All Stacks

```bash
npx cdk deploy --profile personal --all
```

---

## 👤 Seed Initial Admin User (Manual Step)

Manually create the first Cognito admin user if this is the initial deployment:

```bash
aws cognito-idp admin-create-user \
  --user-pool-id us-east-2_QMLJskyI3 \
  --username admin@flowforge.com \
  --user-attributes Name=email,Value=admin@flowforge.com \
  --message-action SUPPRESS \
  --temporary-password ********** \
  --profile personal \
  --region us-east-2
```

Then set a permanent password:

```bash
aws cognito-idp admin-set-user-password \
  --user-pool-id us-east-2_QMLJskyI3 \
  --username admin@flowforge.com \
  --password ********** \
  --permanent \
  --profile personal \
  --region us-east-2
```

---

## 📝 Notes to Self

- Dev Portfolio is deployed via a separate stack using static S3 + CloudFront
- Root domain redirect is optional and configured separately
- Future improvement: automate environment switching (`dev`, `prod`, etc.)
