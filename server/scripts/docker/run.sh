#!/usr/bin/env bash

echo
echo ==================================================================
echo  Building and running React-User-List-Kata
echo ==================================================================
echo

# docker build -f ./src/MyIdentityServer/Dockerfile -t myidentityserver .
docker build -f ./Dockerfile -t stottleuk/react-user-list-kata ../../../

# docker run --rm -d -p 8002:8002 --name my-identity-server myidentityserver
docker run --name react-user-list-kata -p 8080:3102 -d --rm stottleuk/react-user-list-kata
