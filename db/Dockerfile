FROM postgres:16.4

COPY config.sql /docker-entrypoint-initdb.d/config.sql
COPY .pgpass .pgpass
RUN chmod 0600 .pgpass