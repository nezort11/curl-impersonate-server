export PACKAGE_NAME=$(cut -d "=" -f 2 <<< $(npm run env | grep "npm_package_name"))
