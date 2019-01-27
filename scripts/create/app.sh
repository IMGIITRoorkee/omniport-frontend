#!/bin/bash

printf "Hello! Greetings from Team Omniport\n"
read -p "Enter app name in lowercase letters, separating words with spaces: " NAME

APP_NAME="${NAME// /_}"
APP_DISPLAY_NAME="$(tr '[:lower:]' '[:upper:]' <<< ${NAME:0:1})${NAME:1}"

# Enter the apps/ directory
cd omniport/apps/

# Clone the template
git clone "https://github.com/IMGIITRoorkee/omniport-frontend-template.git" ${APP_NAME}
printf "Cloned template successfully\n"

# Enter the app directory
cd ${APP_NAME}

# Restart Git history
rm -rf .git
git init

# Text substitution
sed -i "s/\[\[app_name\]\]/${APP_NAME}/g" config.json
sed -i "s/\[\[app_display_name\]\]/${APP_DISPLAY_NAME}/g" config.json
printf "Added ${APP_NAME} & ${APP_DISPLAY_NAME} in config.json\n"

# Text substitution
sed -i "s/\[\[app_display_name\]\]/${APP_DISPLAY_NAME}/g" README.md
printf "Added ${APP_DISPLAY_NAME} in README.md\n"

# Add non-code files to VCS
git add config.json README.md LICENSE .gitignore

# Enter the components/ directory
cd src/components

# Text substitution
sed -i "s/\[\[app_name\]\]/${APP_NAME}/g" app.js
printf "Added ${APP_NAME} in header and placeholder text\n"

# Add all code to VCS
git add ../../src

# Commit as IMG
git \
    -c user.email=img@iitr.ac.in \
    -c user.name='Information Management Group' \
    commit -m "Initial commit"

# Done!
printf "App created successfully! Happy rendering!\n"
