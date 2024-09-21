APP_BINARY=frontendApp
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/shrinklink?sslmode=disable"
MIGRATION_PATH="./migrations/"

run-build: build-frontend
	@echo "Starting frontend..."
	serve -s build

run:
	@echo "Starting frontend..."
	npm start

build-frontend:
	@echo "Building frontend..."
	npm run build
	@echo "Done!"
	

docker-build:
	@echo "Building docker image..."
	docker build -f Dockerfile -t alpeshjamgade/shrinklink-frontend:${TAG} .
	@echo "Done!!, Image: alpeshjamgade/shrinklink-frontend:${TAG}"