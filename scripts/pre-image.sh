#!/usr/bin/env zsh

set -a
source $(dirname "${BASH_SOURCE[0]}")/projectname-env.sh
source $(dirname "${BASH_SOURCE[0]}")/pre-registry.sh
set +a

export IMAGE_NAME="cr.yandex/${REGISTRY_ID}/${PACKAGE_NAME}:latest"
