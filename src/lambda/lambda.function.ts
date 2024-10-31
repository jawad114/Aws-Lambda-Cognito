import { APIGatewayProxyHandler } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async (event) => {
  const body = JSON.parse(event.body);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Lambda function executed successfully', data: body }),
  };
};
