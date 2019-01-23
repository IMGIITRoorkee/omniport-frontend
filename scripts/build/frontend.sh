#!/bin/bash

# Get the current working directory
CWD=$(pwd)

# Get a name for the container
NAME=react-$(date +"%s")

# Run the container to build the React app into the build/ folder
docker run \
    --rm \
    --userns host \
    --user $(id -u $(whoami)) \
    --mount type=bind,src=${CWD}/omniport,dst=/omniport \
    --name ${NAME} \
    omniport-react:latest \
    yarn --modules-folder /node_modules run build
