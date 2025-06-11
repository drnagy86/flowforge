#!/usr/bin/env node
// cdk/bin/cdk.ts

import * as cdk from 'aws-cdk-lib';
import { FlowForgeStaticSiteStack } from '../lib/cdk-stack';
import { FlowForgeAuthStack } from '../lib/auth-stack';
import { FlowForgeCertStack } from '../lib/cert-stack';
import { DevSiteStack } from '../lib/devsite-stack';
import { RootRedirectStack } from '../lib/root-redirect-stack';
import { ApiStack } from '../lib/api-stack';

const app = new cdk.App();
const target = process.env.STACK || '';  

const commonEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

// Certificate only
if (target === 'cert') {
  new FlowForgeCertStack(app, 'UnifiedCertStack', {
    env: { account: commonEnv.account, region: 'us-east-1' },
    rootDomain: 'derricknagy.dev',
  });
}

// Full stack: static site + auth + API
if (target === 'flowforge') {
  const staticSiteStack = new FlowForgeStaticSiteStack(app, 'FlowForgeStaticSiteStack', {
    env: commonEnv,
  });

  const authStack = new FlowForgeAuthStack(app, 'FlowForgeAuthStack', {
    env: commonEnv,
    callbackUrls: ['http://localhost:5173/', staticSiteStack.distribution.domainName],
  });

  new ApiStack(app, 'FlowForgeApiStack', {
    env: commonEnv,
    userPool: authStack.userPool,
  });
}

// Auth + API (also default when no STACK is specified)
if (target === 'auth-api' || target === '') {
  const authStack = new FlowForgeAuthStack(app, 'FlowForgeAuthStack', {
    env: commonEnv,
    callbackUrls: ['http://localhost:5173/'], 
  });

  new ApiStack(app, 'FlowForgeApiStack', {
    env: commonEnv,
    userPool: authStack.userPool,
  });
}

// Dev portfolio site only
if (target === 'devsite') {
  new DevSiteStack(app, 'DevSiteStack', {
    env: commonEnv,
  });
}

// Root redirect only
if (target === 'root-redirect') {
  new RootRedirectStack(app, 'RootRedirectStack', {
    env: { account: commonEnv.account, region: 'us-east-1' },
  });
}
