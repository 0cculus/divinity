SHELL=/bin/bash
COMPOSE_FILE="docker-compose.yml"
FILEBEAT_COMPOSE ="extensions/filebeat/filebeat_compose.yml"


all: build start

re: fclean setup build start

monitor:
	@docker -f $(FILEBEAT_COMPOSE) up

setup:
	@docker-compose -f $(COMPOSE_FILE) up setup

build:
	@docker-compose -f $(COMPOSE_FILE) build

start:
	@docker-compose -f $(COMPOSE_FILE) up

stop:
	@docker-compose -f $(COMPOSE_FILE) down

check:
	@docker-compose -f $(COMPOSE_FILE) ps

log:
	@docker-compose -f $(COMPOSE_FILE) logs

nginx:
	@docker exec -it nginx $(SHELL)

mariadb:
	@docker exec -it mariadb $(SHELL)

wordpress:
	@docker exec -it wordpress $(SHELL)

fclean:
	@docker-compose -f $(COMPOSE_FILE) down -v --rmi all --remove-orphans --timeout 0 || true
	@docker system prune -af || true

