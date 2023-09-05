import mysql from 'mysql';

export const handler = async function(event, context) {
  
  var message;
  var message_id;

  var connection = mysql.createConnection({
    host     : 'daniel-mysqlforlambda.c7ug0vvtkhqv.us-east-1.rds.amazonaws.com',
    user     : 'admin',
    password : '<my_pass_word>',
    database : 'DanielExampleDB'
  });

  event.Records.forEach(record => {
    
    const { messageId } = record;
    const { body } = record;
    
    message_id = messageId;
    
    if (isJSON(body)) {
      message = JSON.parse(body)['requestPayload']['message'];
    } else {
      message = body;
    }
    
    console.log(`Processing SQS Message: ${message_id} ${message}`);
    
  });
  
  await new Promise(function (resolve, reject) {
    connection.query(`INSERT INTO Message (MessageId, Message) VALUES ('${message_id}', '${message}')`, function (error, results, fields) {
      if (error) throw error;
      console.log(`INSERT SUCCESSFUL: \nMessageId: '${message_id}' \nMessage: '${message}'`);
      connection.end();
    });
  });
  
  return {};
  
}

function isJSON(str) {
    try {
        return JSON.parse(str) && !!str;
    } catch (e) {
        return false;
    }
}
