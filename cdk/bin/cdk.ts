#!/usr/bin/env node
// cdk/bin/cdk.ts
import * as cdk from 'aws-cdk-lib';
import { FlowForgeStaticSiteStack } from '../lib/cdk-stack';
import { FlowForgeAuthStack } from '../lib/auth-stack';
import { FlowForgeCertStack } from '../lib/cert-stack';
import { CreateUserStack } from '../lib/create-user-stack';
import { DevSiteStack } from '../lib/devsite-stack';
import { RootRedirectStack } from '../lib/root-redirect-stack';

const app = new cdk.App();
const target = process.env.STACK || 'all';

const commonEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

if (target === 'all' || target === 'cert') {
  new FlowForgeCertStack(app, 'UnifiedCertStack', {
    env: { ...commonEnv, region: 'us-east-1' },
    rootDomain: 'derricknagy.dev',
  });
}

// FlowForge site + auth stack
if (target === 'all' || target === 'flowforge') {
  const staticSiteStack = new FlowForgeStaticSiteStack(app, 'FlowForgeStaticSiteStack', {
    env: commonEnv, 
  }, );

  new FlowForgeAuthStack(app, 'FlowForgeAuthStack', {
    env: commonEnv,
    callbackUrls: ['http://localhost:5173/', staticSiteStack.distribution.domainName],
  });

  // Optional: user creation stack (commented out for now)
  // new CreateUserStack(app, 'CreateUserStack', {
  //   env: commonEnv,
  //   userPool: authStack.userPool,
  // });
}


// Dev portfolio site
if (target === 'all' || target === 'devsite') {
  new DevSiteStack(app, 'DevSiteStack', {
    env: commonEnv,
  });
}

// Root redirect for derricknagy.dev → www.derricknagy.dev
if (target === 'all' || target === 'root-redirect') {
  new RootRedirectStack(app, 'RootRedirectStack', {
    env: { ...commonEnv, region: 'us-east-1' },
  });
}
