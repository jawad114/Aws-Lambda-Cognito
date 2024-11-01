import { APIGatewayProxyHandler } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    // Parse and validate input
    const body = JSON.parse(event.body);

    // Basic validation (ensure email and password are provided)
    if (!body.email || !body.password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Email and password are required.' }),
      };
    }

    // Return success response
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Lambda function executed successfully', data: body }),
    };
  } catch (error) {
    // Handle JSON parse errors or other unexpected errors
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error', error: error.message }),
    };
  }
};
