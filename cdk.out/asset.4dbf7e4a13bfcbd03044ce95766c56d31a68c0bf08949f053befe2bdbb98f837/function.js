"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handler = async (event) => {
    try {
        const body = JSON.parse(event.body);
        if (!body.email || !body.password) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Email and password are required.' }),
            };
        }
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Lambda function executed successfully', data: body }),
        };
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal server error', error: error.message }),
        };
    }
};
exports.handler = handler;
//# sourceMappingURL=function.js.map