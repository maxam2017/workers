if [ -z "$2" ];then
    echo "Your package name 🥺"
    read package_name
else
    package_name=$2
fi

echo "✨ Start $package_name..."
cd packages/$package_name && wrangler $1
