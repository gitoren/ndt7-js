//const { DynamoDB, ListTablesCommand } = require("aws-sdk/client-dynamodb");
import pkg from 'aws-sdk';
const {AWS, DynamoDB} = pkg;
AWS.config.update({region:'us-east-1' });

(async () => {
  const client = new DynamoDB();
  
  const command = new ListTablesCommand({});
  try {
    const results = await client.send(command);
    console.log(results.TableNames.join("\n"));
  } catch (err) {
    console.error(err);
  }
})();
