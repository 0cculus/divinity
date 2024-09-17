ARG ELASTIC_VERSION

FROM docker.elastic.co/elasticsearch/elasticsearch:${ELASTIC_VERSION:-8.15.1}

COPY ./utils/setup.sh /setup.sh
RUN chmod +x /setup.sh

COPY ./utils/lib.sh /lib.sh
RUN chmod +x /lib.sh

ENTRYPOINT ["/setup.sh"]
