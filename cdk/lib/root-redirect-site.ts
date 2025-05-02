import { Construct } from 'constructs';
import {
  aws_s3 as s3,
  aws_cloudfront as cloudfront,
  aws_route53 as route53,
  aws_certificatemanager as acm,
  aws_route53_targets as targets,
  RemovalPolicy,
  CfnOutput,
} from 'aws-cdk-lib';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { RootRedirectStack } from '../lib/root-redirect-stack';


export interface RootRedirectSiteProps {
  domainName: string;
  redirectTarget: string;
  rootDomain: string;
  certArn: string;
  hostedZone: route53.IHostedZone;
}

export class RootRedirectSite extends Construct {
  constructor(scope: Construct, id: string, props: RootRedirectSiteProps) {
    super(scope, id);

    const certificate = acm.Certificate.fromCertificateArn(this, 'RootCert', props.certArn);

    // S3 bucket configured for redirection
    const redirectBucket = new s3.Bucket(this, 'RedirectBucket', {
      websiteRedirect: {
        hostName: props.redirectTarget,
        protocol: s3.RedirectProtocol.HTTPS,
      },
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    });

    const distribution = new cloudfront.Distribution(this, 'RootDistribution', {
      defaultRootObject: '',
      defaultBehavior: {
        origin: new S3Origin(redirectBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      domainNames: [props.domainName],
      certificate,
    });

    new route53.ARecord(this, 'RootAliasRecord', {
      zone: props.hostedZone,
      recordName: '', // root domain
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
    });

    new CfnOutput(this, 'RootRedirectURL', {
      value: `https://${props.domainName}`,
      description: 'Root domain redirect URL',
    });
  }
}
