import { Stack, StackProps, Duration, RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as cognito from 'aws-cdk-lib/aws-cognito';

export interface CreateUserStackProps extends StackProps {
  userPool: cognito.UserPool;
}

export class CreateUserStack extends Stack {
  constructor(scope: Construct, id: string, props: CreateUserStackProps) {
    super(scope, id, props);

    const { userPool } = props;

    // DynamoDB table to store user metadata
    const userTable = new dynamodb.Table(this, 'UsersTable', {
      tableName: 'FlowForgeUsers',
      partitionKey: { name: 'email', type: dynamodb.AttributeType.STRING },
      removalPolicy: RemovalPolicy.DESTROY, // safe for dev; change to RETAIN for prod
    });

    // AppSync API using Cognito auth
    const api = new appsync.GraphqlApi(this, 'FlowForgeApi', {
      name: 'FlowForgeApi',
      schema: appsync.SchemaFile.fromAsset('graphql/schema.graphql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.USER_POOL,
          userPoolConfig: { userPool },
        },
      },
      xrayEnabled: true,
    });

    // Lambda function to create users in Cognito and store metadata in DynamoDB
    const createUserLambda = new lambda.Function(this, 'CreateUserLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/create-user'),
      environment: {
        USER_TABLE: userTable.tableName,
        USER_POOL_ID: userPool.userPoolId,
      },
      timeout: Duration.seconds(10),
    });

    // Grant Lambda access to DynamoDB and Cognito
    userTable.grantWriteData(createUserLambda);
    userPool.grant(createUserLambda, 'cognito-idp:AdminCreateUser');
    userPool.grant(createUserLambda, 'cognito-idp:AdminAddUserToGroup');

    // Register Lambda as a resolver for createUser mutation
    const dataSource = api.addLambdaDataSource('CreateUserDataSource', createUserLambda);
    dataSource.createResolver('CreateUserResolver', {
      typeName: 'Mutation',
      fieldName: 'createUser',
    });

    // Optional: Output the API endpoint
    new appsync.CfnGraphQLApi(this, 'FlowForgeGraphqlApi', {
      name: api.name,
      authenticationType: 'AMAZON_COGNITO_USER_POOLS',
    });
  }
}
