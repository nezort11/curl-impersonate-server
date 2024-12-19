#!/usr/bin/env zsh

set -a
source $(dirname "${BASH_SOURCE[0]}")/pre-registry.sh
set +a

export IMAGE_NAME="cr.yandex/${REGISTRY_ID}/${CONTAINER_NAME}:latest"
