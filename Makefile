build:
	docker build -t genesi-e2e:dev -f .docker/Dockerfile .

run:
	docker run -ti --rm genesi-e2e:dev
