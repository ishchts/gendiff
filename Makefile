build:
	npm run build

start:
	npx babel-node dist/bin/gendiff.js

install:
	npm install

lint:
	npx eslint .

publish:
	npm publish --dry-run

test:
	npm run test 