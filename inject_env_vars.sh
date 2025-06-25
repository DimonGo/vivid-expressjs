#!/bin/bash

ENV_EXAMPLE_FILE=".env.example"
ENV_LOCAL_FILE=".env"
SECRET_FILE="env.yaml"

if command -v sops > /dev/null; then
  if [ -f "$ENV_EXAMPLE_FILE" ]; then
    cp "$ENV_EXAMPLE_FILE" "$ENV_LOCAL_FILE"
    if [ -f "$ENV_LOCAL_FILE" ]; then
      vars="$(sops -d "$SECRET_FILE")"
      while IFS=$'\n' read -r var; do
        var_name=$(echo "$var" | cut -d':' -f1 | tr -d ' ')
        var_value=$(echo "$var" | cut -d':' -f2- | tr -d ' ')
        # Notice custom separator "<" used in the sed command, you can use different one
        sed -i '' -e "s<###${var_name}###<\"${var_value}\"<g" "$ENV_LOCAL_FILE"
      done <<< "$vars"
    fi
  else
    echo ".env.example file must exist"
    exist 13
  fi
else
  echo "sops is not installed"
  exit 12
fi


