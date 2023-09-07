import mysql from 'mysql';

var connection = mysql.createConnection({
    host     : 'daniel-mysqlforlambda.c7ug0vvtkhqv.us-east-1.rds.amazonaws.com',
    user     : 'admin',
    password : '<my_password>',
    database : 'DanielExampleDB'
});

function isJSON(str) {
    try {
        return JSON.parse(str) && !!str;
    } catch (e) {
        return false;
    }
}

function InsertNewMessage(message_id, message){
    return new Promise((resolve, reject)=>{
        connection.query(`INSERT INTO Message (MessageId, Message) VALUES ('${message_id}', '${message}')`,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
};

export const handler = async function(event, context) {
  
  var message;
  var message_id;

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
  
  try {
  const result = await InsertNewMessage(message_id, message);
  // here you can do something with the three results
  
  } catch(error){
    console.log(error);
  }
  
  return {};
  
}