#!/usr/bin/env bash

echo
echo ==================================================================
echo  Building and running React-User-List-Kata
echo ==================================================================
echo

set -e

cd `dirname $0`

docker build -f ./Dockerfile -t stottleuk/react-user-list-kata ../../../

docker run --name react-user-list-kata -p 8080:3102 -d --rm stottleuk/react-user-list-kata
