#!/bin/bash

PORT_LOWER_LIMIT=61000
PORT_UPPER_LIMIT=61031
PREFERRED_PORT=-1

DJANGO=-1

while getopts ":d:p:" opt; do
    case ${opt} in
        d )
            DJANGO=${OPTARG}
            ;;
        p )
            PREFERRED_PORT=${OPTARG}
            ;;
        \? )
            printf "Bad command: ${OPTARG} is not a valid flag\n"
            printf "Usage: ./scripts/start/react.sh -d port [-p <port>]\n"
            ;;
        : )
            printf "Bad command: ${OPTARG} requires an argument\n"
            printf "Usage: ./scripts/start/react.sh -d port [-p <port>]\n"
            ;;
    esac
done
shift $((OPTIND -1))

# Start the React server on the specified port
#
# Syntax: start_react_server <proxy> <port>
start_react_server() {

    PROXY=$1
    PORT=$2

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
        --link 60000:60000 \
        --publish ${PORT}:${PORT}/tcp \
        --mount type=bind,src=${CWD}/omniport,dst=/omniport \
        --name=${NAME} \
        --network-alias react${NAME} \
        --env NAME=${NAME} \
        --env PROXY=${PROXY} \
        omniport-react:latest \
        yarn --modules-folder ../node_modules start --port ${PORT}
}

if [[ ${DJANGO} -ne -1 ]]; then
    if [[ ${PREFERRED_PORT} -ne -1 ]]; then
        printf "Trying to assign port: ${PREFERRED_PORT}\n"
        docker container ls -a | grep ${PREFERRED_PORT} &> /dev/null
        if [[ $? -ne 0 ]]; then
            start_react_server ${DJANGO} ${PREFERRED_PORT}
        else
            printf "Port ${PREFERRED_PORT} is not available\n"
        fi
    else
        printf "Searching for a free port\n"
        for (( i = ${PORT_LOWER_LIMIT} ; i <= ${PORT_UPPER_LIMIT} ; i++ )); do
            printf "Trying to assign port: ${i}\r"
            docker container ls -a | grep ${i} &> /dev/null
            if [[ $? -ne 0 ]]; then
                printf "\n"
                start_react_server ${DJANGO} ${i}; break
            fi
        done
    fi
else
    printf "The port of the Django server is required\n"
    printf "Usage: ./scripts/start/react.sh -d port [-p <port>]\n"
fi
printf "\nDone\n"
