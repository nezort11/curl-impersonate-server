#!/usr/bin/env zsh

set -a
source $(dirname "${BASH_SOURCE[0]}")/pre-env.sh
set +a

registry_info=$(yc container registry get $REGISTRY_NAME)

export REGISTRY_ID=$(echo "$registry_info" | awk '/^id:/ {print $2}')

if [[ -z "$REGISTRY_ID" ]]; then
  echo "ERROR: registry id is empty"
  exit 1
fi
