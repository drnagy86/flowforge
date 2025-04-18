import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';
// import * as ssm from 'aws-cdk-lib/aws-ssm';

export interface FlowForgeCertStackProps extends StackProps {
  rootDomain: string;
  subDomain: string;
}

export class FlowForgeCertStack extends Stack {
  constructor(scope: Construct, id: string, props: FlowForgeCertStackProps) {
    super(scope, id, {
      ...props,
      env: { account: props.env?.account, region: 'us-east-1' },
    });

    const hostedZone = route53.HostedZone.fromLookup(this, 'HostedZone', {
      domainName: props.rootDomain,
    });

    const cert = new acm.Certificate(this, 'FlowForgeCert', {
      domainName: props.subDomain,
      validation: acm.CertificateValidation.fromDns(hostedZone),
    });


    new CfnOutput(this, 'FlowForgeCertArn', {
      value: cert.certificateArn,
      description: 'The ARN of the FlowForge certificate. Update in cdk.json under context.',
    });
  }
}
