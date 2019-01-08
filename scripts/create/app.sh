printf "Hello! Greetings from Team Omniport\n"
read -p "Enter app name in lowercase letters, separating words with spaces: " name

app_name_underscore="${name// /_}"
app_name_dash="${name// /-}"
app_name_display="$(tr '[:lower:]' '[:upper:]' <<< ${name:0:1})${name:1}"

# Clone the template
cd omniport/apps/
git clone "https://github.com/IMGIITRoorkee/omniport-frontend-template.git" ${app_name_underscore}
printf "Cloned template successfully\n"

# Work inside the app directory
cd ${app_name_underscore}

# Restart Git history
rm -rf .git
git init

# Replace placeholders with app related data
sed -i "s/\[\[app_name\]\]/${app_name_underscore}/g" config.json
sed -i "s/\[\[app\-display\-name\]\]/${app_name_display}/g" config.json
printf "Added ${app_name_underscore} & ${app_name_display} in config.json\n"
sed -i "s/\[\[app\-display\-name\]\]/${app_name_display}/g" README.md
printf "Added ${app_name_display} in README.md\n"
git add config.json README.md LICENSE .gitignore

# Replace placeholders with app related data
cd src/components
sed -i "s/\[\[app_name\]\]/${app_name_underscore}/g" app.js
printf "Added ${app_name_underscore} in header and placeholder text\n"
git add ../../src
git -c user.email=img@iitr.ac.in -c user.name='Information Management Group' commit -m "Initial commit"

# Done!
printf "App created successfully! Happy rendering!\n"
