#!/bin/env sh

docker login --username=_ --password=$HEROKU_API_KEY registry.heroku.com

if [ "${CIRCLE_BRANCH}" == "staging" ]; then
    APP="url-shortener-ms-staging"
elif [ "${CIRCLE_BRANCH}" == "master" ]; then
    APP="tdt-url-shotener-ms"

heroku container:push web --app=$APP
heroku container:release web --app=$APP
heroku run node ./dist/database/seeder.js --app=$APP