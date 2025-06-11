// lib/api-stack.ts

import { Stack, StackProps, RemovalPolicy, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as appsync from '@aws-cdk/aws-appsync-alpha';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as cognito from 'aws-cdk-lib/aws-cognito';

export interface ApiStackProps extends StackProps {
  userPool: cognito.IUserPool;
}

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);

    // 1. Create a DynamoDB table for "User"
    const userTable = new dynamodb.Table(this, 'UserTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      tableName: 'FlowForgeUsers',
      removalPolicy: RemovalPolicy.DESTROY,
    });

    // 2. Create an AppSync GraphQL API
    const api = new appsync.GraphqlApi(this, 'FlowForgeGraphQL', {
      name: 'FlowForgeService',
      schema: appsync.SchemaFile.fromAsset('graphql/schema.graphql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.USER_POOL,
          userPoolConfig: {
            userPool: props.userPool,
          },
        },
      },
      xrayEnabled: true,
    });

    // 3. Create a DynamoDB data source for the User table
    const userDs = api.addDynamoDbDataSource('UserDataSource', userTable);

    // 4. Grant the data source permission to read/write the DynamoDB table
    userTable.grantFullAccess(userDs);

    // 5. Resolver for createUser (Mutation.createUser)
    userDs.createResolver('CreateUserResolver', {
      typeName: 'Mutation',
      fieldName: 'createUser',
      requestMappingTemplate: appsync.MappingTemplate.fromString(`
        ## set a timestamp
        $util.qr($ctx.args.input.put("createdAt", $util.time.nowISO8601()))
        {
          "version": "2017-02-28",
          "operation": "PutItem",
          "key": {
            "id": { "S": "$ctx.args.input.id" }
          },
          "attributeValues": $util.dynamodb.toMapValuesJson($ctx.args.input)
        }
      `),
      responseMappingTemplate: appsync.MappingTemplate.fromString(`
        ## return the newly created item
        $util.toJson($ctx.result)
      `),
    });

    // 6. Resolver for getUser (Query.getUser)
    userDs.createResolver('GetUserResolver', {
      typeName: 'Query',
      fieldName: 'getUser',
      requestMappingTemplate: appsync.MappingTemplate.fromString(`
        {
          "version": "2017-02-28",
          "operation": "GetItem",
          "key": { "id": { "S": "$ctx.args.id" } }
        }
      `),
      responseMappingTemplate: appsync.MappingTemplate.fromString(`
        $util.toJson($ctx.result)
      `),
    });

    // 7. Resolver for listUsers (Query.listUsers)
    userDs.createResolver('ListUsersResolver', {
      typeName: 'Query',
      fieldName: 'listUsers',
      requestMappingTemplate: appsync.MappingTemplate.fromString(`
        {
          "version": "2017-02-28",
          "operation": "Scan"
        }
      `),
      responseMappingTemplate: appsync.MappingTemplate.fromString(`
        $util.toJson($ctx.result.items)
      `),
    });

    // 8. Output the GraphQL API URL
    new CfnOutput(this, 'GraphQLApiUrl', {
      value: api.graphqlUrl,
      description: 'AppSync API endpoint',
    });
  }
}
