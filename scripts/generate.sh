#!/bin/bash

if [ -z "$1" ];then
    echo "Your package name 🥺"
    read package_name
else
    package_name=$1
fi

echo "🔧 Creating project called $package_name..."
git clone --depth=1 --branch=master git@github.com:maxam2017/worker-example packages/$package_name > /dev/null 2>&1
rm -rf packages/$package_name/.git

cd packages/$package_name && yarn init --yes > /dev/null 2>&1
lerna bootstrap > /dev/null 2>&1
echo "✨ Done! New project created `pwd`/packages/$package_name"
