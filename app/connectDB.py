import psycopg2
import os
import subprocess
import time

from django.core.management.commands.makemigrations import Command as MakemigrationsCommand


nbr_connections = 6
conn_cred = "dbname='{}' user='{}' password='{}' host='{}' port='{}'".\
    format(os.environ.get('SQL_DATABASE'), os.environ.get('SQL_USER'), os.environ.get('SQL_PASSWORD'), os.environ.get('SQL_HOST'), os.environ.get('SQL_PORT'))
while (nbr_connections > 0) :
    try :
        psycopg2.connect(conn_cred)
    except :
        print("Cannot connect to database\nRetrying again in 10 seconds\n")
        nbr_connections -= 1
        time.sleep(10)
        continue
    break

if (nbr_connections <= 0) :
    print("Cannot connect to the database\n Please check if the container's running or if he credentials are wrong")
else:
    print("Connection succesfull!\n")
    subprocess.run(['bash', 'migrations.sh'])