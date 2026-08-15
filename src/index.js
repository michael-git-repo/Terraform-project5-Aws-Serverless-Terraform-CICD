const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
  const tableName = process.env.TABLE_NAME;
  const body = event.body ? JSON.parse(event.body) : {};
  const itemId = body.id || Date.now().toString();

  const command = new PutCommand({
    TableName: tableName,
    Item: {
      id: itemId,
      timestamp: new Date().toISOString(),
      message: body.message || "Hello from Serverless API!"
    }
  });

  try {
    await docClient.send(command);
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Item saved successfully!", id: itemId })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: error.message })
    };
  }
};