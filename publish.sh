#!/bin/bash
set -e

nr init:packagejson

sdk_package_name=$SDK_PACKAGE_NAME
sdk_yunti_name=$SDK_YUNTI_NAME
test_only=$TEST_ONLY

if [ $sdk_package_name ] && [ $sdk_yunti_name ]; then
  echo $sdk_package_name $sdk_yunti_name
else
  echo `env SDK_PACKAGE_NAME and SDK_YUNTI_NAME are required`
  exit 1
fi

nr gen:gql

if [ $test_only ]; then
  echo "SDK generated successfully"
  exit 0
fi

nr pub

cnpm sync $sdk_package_name
