build:
	docker build -t genesi-e2e:dev -f .docker/Dockerfile .

run-ci:
	docker run -ti --rm genesi-e2e:dev ci

run-hc:
	docker run -ti --rm genesi-e2e:dev healthcheck
