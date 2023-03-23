#!/bin/bash

docker exec -it converter-service yarn test

sleep 10

docker exec -it converter-service yarn test:e2e