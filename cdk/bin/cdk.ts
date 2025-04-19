#!/usr/bin/env node
// cdk/bin/cdk.ts
import * as cdk from 'aws-cdk-lib';
import { FlowForgeStaticSiteStack } from '../lib/cdk-stack';
import { FlowForgeAuthStack } from '../lib/auth-stack';
import { CreateUserStack } from '../lib/create-user-stack';
import { FlowForgeCertStack } from '../lib/cert-stack';

const app = new cdk.App();

// only need to be run once and must be in us-east-1
const certStack = new FlowForgeCertStack(app, 'FlowForgeCertStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: 'us-east-1', // ACM certificates for CloudFront must be in us-east-1
  },
  rootDomain: 'derricknagy.dev',
  subDomain: 'flowforge.derricknagy.dev',
});

const staticSiteStack = new FlowForgeStaticSiteStack(app, 'FlowForgeStaticSiteStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});

const authStack = new FlowForgeAuthStack(app, 'FlowForgeAuthStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  // add urls for the static site
  callbackUrls: ['http://localhost:5173/', staticSiteStack.distribution.domainName],

});

// new CreateUserStack(app, 'CreateUserStack', {
//   env: {
//     account: process.env.CDK_DEFAULT_ACCOUNT,
//     region: process.env.CDK_DEFAULT_REGION,
//   },
//   userPool: authStack.userPool, 
// });






