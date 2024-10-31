// lib/cdk-stack.ts
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';  // Update to use the constructs package
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as dotenv from 'dotenv';
dotenv.config();

export class MyCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const userPool = new cognito.UserPool(this, 'MyUserPool', {
      userPoolName: 'myUserPool',
      selfSignUpEnabled: true,
      signInAliases: { email: true },
    });

    const userPoolClient = userPool.addClient('UserPoolClient', {
      generateSecret: false,
    });

    const myLambda = new lambda.Function(this, 'MyLambdaFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'lambda.function.handler',
      code: lambda.Code.fromAsset('./src/lambda'),
    });


    const api = new apigateway.LambdaRestApi(this, 'MyApi', {
      handler: myLambda,
      proxy: false,
    });

;

    const user = api.root.addResource('user');
    user.addMethod('POST');


    new cdk.CfnOutput(this, 'UserPoolId', {
      value: userPool.userPoolId,
    });

    new cdk.CfnOutput(this, 'UserPoolClientId', {
      value: userPoolClient.userPoolClientId,
    });
  }
}
