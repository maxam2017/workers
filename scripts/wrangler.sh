#!/bin/bash
. .env

if [ -z "$1" ];then
    echo "Your package name 🥺"
    read package_name
else
    package_name=$1
fi

echo "✨ Start $package_name..."

cd packages/$package_name && CF_ACCOUNT_ID=$CF_ACCOUNT_ID wrangler "${@:2}" --stream
# lerna run --scope $package_name "${@:2}" --stream
