UID:=$(shell id --user)
GID:=$(shell id --group)

dc = docker-compose
run = $(dc) run --rm -u ${UID}:${GID}
manage = $(run) dev python manage.py
pytest = $(run) test pytest $(ARGS)

build:
	$(dc) build

app:
	$(run) --service-ports app

dev:
	$(run) --service-ports dev

bash:
	$(run) dev bash

test:
	$(run) test-unit
