import { rm, mkdir, cp } from 'shelljs';
import { NetworkType } from '../config/config-types';
import { values } from 'lodash';
import fs from 'fs';
import path from 'path';

exports.copyAssets = (type, env) => {
  rm('-rf', type);
  mkdir(type);
  mkdir(`${type}/js`);
  cp(`chrome/manifest.${env}.json`, `${type}/manifest.json`);
  cp('-R', 'chrome/assets/*', type);
  cp('chrome/content-scripts/3rd-party-trezor/*.js', `${type}/js/`);
  cp('chrome/content-scripts/3rd-party-trezor/trezor-usb-permissions.html', `${type}/`);
};

const buildManifest = (type, isDebug) => {
  const genManifestContent = require(`../chrome/manifest.${type}`);
  const manifestContent = genManifestContent(isDebug);
  const manifestContentJSON = JSON.stringify(manifestContent, null, 4);

  const OUTPUT_FILE_NAME = `manifest.${type}.json`;
  const manifestDestPath = path.resolve(`${__dirname}/../chrome`, OUTPUT_FILE_NAME);

  try {
    fs.writeFileSync(manifestDestPath, manifestContentJSON);
    console.log(`File ${OUTPUT_FILE_NAME} has been created`);
  } catch (err) {
    console.error(err);
  }
};

const manifestTypes = values(NetworkType);
exports.buildManifests = (isDebug) => {
  manifestTypes.map((type) => buildManifest(type, isDebug));
};
