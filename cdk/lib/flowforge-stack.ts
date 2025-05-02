import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as route53 from 'aws-cdk-lib/aws-route53';
import { StaticSite } from './static-site';

export class FlowForgeStaticSiteStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const rootDomain = 'derricknagy.dev';
    const subDomain = 'flowforge';
    const domainName = `${subDomain}.${rootDomain}`;

    const hostedZone = route53.HostedZone.fromLookup(this, 'HostedZone', {
      domainName: rootDomain,
    });

    const certArn = this.node.tryGetContext('certArnUnified');
    if (!certArn) throw new Error('Missing certArnUnified context value');

    new StaticSite(this, 'FlowForgeSite', {
      domainNames: [domainName], // <-- needs to be array now
      rootDomain,
      hostedZone,
      certArn,
      siteAssetPath: '../frontend-client/dist',
    });
  }
}
