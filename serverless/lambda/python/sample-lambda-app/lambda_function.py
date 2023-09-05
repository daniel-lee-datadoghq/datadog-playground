import sys
import logging
import pymysql
import json
import os

# Tracing in Lambda occurs through the handler function itself, not through the whole file, so the mysql client library is being loaded before dd-trace can patch it. The workaround is to double patch dd-trace here.
from ddtrace import patch_all
patch_all()

# rds settings
user_name = os.environ['USER_NAME']
password = os.environ['PASSWORD']
rds_host = os.environ['RDS_HOST']
db_name = os.environ['DB_NAME']

# API path settings
GET_RAW_PATH = '/getPerson'
CREATE_RAW_PATH = '/createPerson'

logger = logging.getLogger()
logger.setLevel(logging.INFO)

# create the database connection outside of the handler to allow connections to be
# re-used by subsequent function invocations.
try:
    conn = pymysql.connect(host=rds_host, user=user_name, passwd=password, db=db_name, connect_timeout=5)
except pymysql.MySQLError as e:
    logger.error("ERROR: Unexpected error: Could not connect to MySQL instance.")
    logger.error(e)
    sys.exit()

logger.info("SUCCESS: Connection to RDS MySQL instance succeeded")

def lambda_handler(event, context):
    if event['rawPath'] == GET_RAW_PATH:
        
        # get person path
        print('Start Request for "/getPerson"')
        
        # call database
        response = execute_select_statement('SELECT * FROM DanielExampleDB.Customers')
        
        # return results
        return response

    elif event['rawPath'] == CREATE_RAW_PATH:
        
        # create person path
        print('Start Request for "/createPerson"')
        
        # call database
        decodedEvent = json.loads(event['body'])
        FirstName = decodedEvent['FirstName']
        CustomerId = int((execute_select_statement('SELECT MAX(CustomerId) AS MAX_ID FROM DanielExampleDB.Customers'))[0]['MAX_ID']) + 1
        response = execute_update_statement(f'INSERT INTO DanielExampleDB.Customers (FirstName, CustomerId) VALUES ("{FirstName}", "{CustomerId}")')
    
        # return results
        return {
            'CustomerId': CustomerId,
            'FirstName': FirstName
        }

def execute_select_statement(sql):
    # run query on database
    with conn.cursor() as cur:
        cur.execute(sql)
        # Fetch all the data
        data = cur.fetchall()
        # Convert the data to a list of dictionaries
        rows = [dict(zip([column[0] for column in cur.description], row)) for row in data]
        # Convert the list of dictionaries to a JSON string
        json_string = json.dumps(rows)
        # Covert the JSON string to JSON object
        response = json.loads(json_string)

    # return results
    return response

def execute_update_statement(sql):
    # run query on database
    with conn.cursor() as cur:
        cur.execute(sql)
        conn.commit()
        
    # return results
    response = 'OK'
    return response