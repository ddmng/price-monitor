build:
	docker build -t price-monitor -f .docker/Dockerfile .

run: build
	docker run -ti --rm price-monitor
