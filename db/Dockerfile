FROM postgres:16.4

COPY config.sql /config.sql

ENTRYPOINT ["sql", "/config.sql"]
