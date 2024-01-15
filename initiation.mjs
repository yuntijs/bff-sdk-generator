#!/usr/bin/env zx

import * as fs from 'node:fs';
import * as semver from 'semver';

const PACKAGE_PATH = './package.json';
const FATHERRC_PATH = './.fatherrc.ts';
const INDEX_FILE_PATH = './src/index.ts';

const SDK_PACKAGE_NAME = process.env.SDK_PACKAGE_NAME;
const SDK_YUNTI_NAME = process.env.SDK_YUNTI_NAME;
const GRAPH_API_ENDPOINT = process.env.GRAPH_API_ENDPOINT;
const GRAPH_CLIENT_ENDPOINT = process.env.GRAPH_CLIENT_ENDPOINT;
const SDK_RELEASE_TYPE = process.env.SDK_RELEASE_TYPE;
const SDK_RELEASE_REGISTRY = process.env.SDK_RELEASE_REGISTRY;

if (!SDK_PACKAGE_NAME) {
  console.error('env SDK_PACKAGE_NAME is required')
  process.exit(1)
}

if (!SDK_YUNTI_NAME) {
  console.error('env SDK_YUNTI_NAME is required')
  process.exit(1)
}

if (!GRAPH_API_ENDPOINT) {
  console.error('env GRAPH_API_ENDPOINT is required')
  process.exit(1)
}

if (!GRAPH_CLIENT_ENDPOINT) {
  console.error('env GRAPH_CLIENT_ENDPOINT is required')
  process.exit(1)
}

let version = '1.0.0';
try {
  const preVersion = await $`npm view ${SDK_PACKAGE_NAME} version`;
  version = semver.inc(preVersion.stdout || '1.0.0', SDK_RELEASE_TYPE || 'patch');
} catch (error) {
  console.error(`failed to view ${SDK_PACKAGE_NAME} version`)
}

fs.writeFileSync(
  PACKAGE_PATH,
  fs
    .readFileSync(PACKAGE_PATH)
    .toString()
    .replace(
      `"name": "@yuntijs/bff-sdk-name"`,
      `"name": "${SDK_PACKAGE_NAME}"`
    )
    .replace(
      `"version": "1.0.0"`,
      `"version": "${version}"`
    )
    .replace(
      `"library": "BffSDKLibrary"`,
      `"library": "${SDK_YUNTI_NAME}"`
    )
    .replace(
      `"registry": "https://registry.npmjs.org/"`,
      `"registry": "${SDK_RELEASE_REGISTRY || 'https://registry.npmjs.org/'}"`
    )
)

fs.writeFileSync(
  FATHERRC_PATH,
  fs
    .readFileSync(FATHERRC_PATH)
    .toString()
    .replace(
      `name: "BffSDKLibrary"`,
      `name: "${SDK_YUNTI_NAME}"`
    )
)

fs.writeFileSync(
  INDEX_FILE_PATH,
  fs
    .readFileSync(INDEX_FILE_PATH)
    .toString()
    .replace(
      `'<replace>grqph_client_endpoint</replace>'`,
      `'${GRAPH_CLIENT_ENDPOINT}'`
    )
)
