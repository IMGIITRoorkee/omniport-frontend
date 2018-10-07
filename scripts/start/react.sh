#!/bin/bash

PORT_LOWER_LIMIT=61000
PORT_UPPER_LIMIT=61031
PREFERRED_PORT=-1

while getopts ":p:" opt; do
    case ${opt} in
        p )
            PREFERRED_PORT=${OPTARG}
            ;;
        \? )
            printf "Bad command: ${OPTARG} is not a valid flag\n"
            printf "Usage: ./scripts/start-the-dj.sh [-p <port>]\n"
            ;;
        : )
            printf "Bad command: ${OPTARG} requires an argument\n"
            printf "Usage: ./scripts/start-the-dj.sh [-p <port>]\n"
            ;;
    esac
done
shift $((OPTIND -1))

# Start the React server on the specified port
#
# Syntax: start_react_server <port>
start_react_server() {

    PORT=$1

    CWD=$(pwd)
    NAME=${PORT}
    HOST="0.0.0.0"

    docker run \
        --tty \
        --interactive \
        --rm \
        --userns host \
        --user $(id -u $(whoami)) \
        --network=omniport-docker_network \
        --publish ${PORT}:${PORT}/tcp \
        --mount type=bind,src=${CWD}/omniport,dst=/omniport \
        --name=${NAME} \
        omniport-react:latest \
        npm start --prefix /omniport --port ${PORT}
}

if [ ${PREFERRED_PORT} -ne -1 ]; then
    printf "Trying to assign port: ${PREFERRED_PORT}\n"
    docker container ls -a | grep ${PREFERRED_PORT} &> /dev/null
    if [ $? -ne 0 ]; then
        start_react_server ${PREFERRED_PORT}
    else
        printf "Port ${PREFERRED_PORT} is not available\n"
    fi
else
    printf "Searching for a free port\n"
    for (( i = ${PORT_LOWER_LIMIT} ; i <= ${PORT_UPPER_LIMIT} ; i++ )); do
        printf "Trying to assign port: ${i}\r"
        docker container ls -a | grep ${i} &> /dev/null
        if [ $? -ne 0 ]; then
            printf "\n"
            start_react_server ${i}; break
        fi
    done
fi
printf "\nDone\n"
