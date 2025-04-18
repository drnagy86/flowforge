import {CfnOutput, RemovalPolicy, Stack, StackProps} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import * as cognito from 'aws-cdk-lib/aws-cognito';

export interface FlowForgeAuthStackProps extends StackProps {
  callbackUrls: string[];
}

export class FlowForgeAuthStack extends Stack {
  public readonly userPool: cognito.UserPool;
  
  public readonly userPoolClient: cognito.UserPoolClient;
  constructor(scope: Construct, id: string, props: FlowForgeAuthStackProps) {
    super(scope, id, props);
    // get the callback urls from the props
    const {callbackUrls} = props;

    // Create the user pool
    this.userPool = new cognito.UserPool(this, 'FlowForgeUserPool', {
      userPoolName: 'FlowForgeUserPool',
      selfSignUpEnabled: false, // Admin-created users only
      signInAliases: {
        email: true,
      },
      autoVerify: {
        email: true,
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    // Create a user pool client
    this.userPoolClient = new cognito.UserPoolClient(this, 'FlowForgeUserPoolClient', {
      userPool: this.userPool,
      generateSecret: false,
      authFlows: {
        adminUserPassword: true,
        userPassword: true,
      },
      oAuth: {
        flows: {
          implicitCodeGrant: true
        },
        callbackUrls: callbackUrls,
        logoutUrls: callbackUrls,
      }
    });

    // Outputs
    new CfnOutput(this, 'UserPoolId', {
      value: this.userPool.userPoolId,
      description: 'Cognito User Pool ID',
    });
    // need to pass the userPoolID to the create user stack
    // new CfnOutput(this, 'UserPoolClientSecret', {
    //   value: this.userPoolClient.userPoolClientId,
    //   description: 'Cognito User Pool Client Secret',
    // });

    new CfnOutput(this, 'UserPoolClientId', {
      value: this.userPoolClient.userPoolClientId,
      description: 'Cognito User Pool Client ID',
    });
  }
}
