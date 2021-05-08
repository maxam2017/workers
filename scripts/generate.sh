#!/bin/bash

if [ -z "$1" ];then
    echo "Your package name 🥺"
    read package_name
else
    package_name=$1
fi

echo "🔧 Creating project called $package_name..."
git clone git@github.com:maxam2017/worker-example packages/$package_name > /dev/null 2>&1

cd packages/$package_name && yarn init --yes > /dev/null 2>&1
echo "✨   Done! New project created `pwd`/packages/$package_name"
echo "🕵️  You can find your zone_id in the right sidebar of a zone's overview tab at https://dash.cloudflare.com"
echo "🕵️  You can copy your account_id below"

wrangler whoami
echo "🕵️  You will need to update the following fields in the created packages/$package_name/wrangler.toml file before continuing:
- account_id"
