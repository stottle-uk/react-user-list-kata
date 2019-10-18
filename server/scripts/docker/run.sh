#!/usr/bin/env bash

echo
echo ==================================================================
echo  Building and running React-User-List-Kata
echo ==================================================================
echo

set -e

interanlPwd=`pwd`

cd `dirname $0`

docker build -f ./Dockerfile -t stottleuk/react-user-list-kata $interanlPwd

docker run --name react-user-list-kata -p 8080:3102 -d --rm --env API_BASE_URL=http://host.docker.internal:3000 stottleuk/react-user-list-kata
