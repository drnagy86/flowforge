// cdk/lib/root-redirect-stack.ts
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as route53 from 'aws-cdk-lib/aws-route53';
import { RootRedirectSite } from './root-redirect-site';

export class RootRedirectStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const domainName = 'derricknagy.dev';
    const rootDomain = 'derricknagy.dev';

    const hostedZone = route53.HostedZone.fromLookup(this, 'HostedZoneRoot', {
      domainName: rootDomain,
    });

    const certArn = this.node.tryGetContext('certArnUnified');
    if (!certArn) {
      throw new Error('Missing certArnRoot context value');
    }

    new RootRedirectSite(this, 'RootRedirectSite', {
      domainName,
      redirectTarget: 'www.derricknagy.dev',
      rootDomain,
      hostedZone,
      certArn,
    });
  }
}
