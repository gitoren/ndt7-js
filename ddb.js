//const { DynamoDB, ListTablesCommand } = require("aws-sdk/client-dynamodb");
import pkg from 'aws-sdk';
const {AWS, DynamoDB} = pkg;
AWS.config.update({region:'us-east-1',
aws_access_key_id : "AKIA4LVOLGWQY2UJDU42",
    aws_secret_access_key : "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" });

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
