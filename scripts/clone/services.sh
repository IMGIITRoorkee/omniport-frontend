#!/bin/bash

# Import the utility functions
source ./scripts/clone/utils.sh

# Enter the directory to clone into
cd omniport/services/

# Clone services
clonerepo   "Apps"            "omniport-frontend-apps"            "apps"
clonerepo   "Auth"            "omniport-frontend-auth"            "auth"
clonerepo   "Developer"       "omniport-frontend-developer"       "developer"
clonerepo   "Feed"            "omniport-frontend-feed"            "feed"
clonerepo   "File Manager"    "omniport-frontend-file-manager"    "file_manager"
clonerepo   "Groups"          "omniport-frontend-groups"          "groups"
clonerepo   "Helpcentre"      "omniport-frontend-helpcentre"      "helpcentre"
clonerepo   "Links"           "omniport-frontend-links"           "links"
clonerepo   "Maintainer Site" "omniport-frontend-maintainer-site" "maintainer_site"
clonerepo   "OAuth"           "omniport-frontend-oauth"           "oauth"
clonerepo   "Settings"        "omniport-frontend-settings"        "settings"
clonerepo   "Terms of use"    "omniport-frontend-terms-of-use"    "terms_of_use"