import buildManifest from './manifest.template';
import {
  Version,
  genCSP,
} from './constants';

export default (isDebug) => buildManifest({
  description: 'Trezor Webpack example',
  defaultTitle: 'Trezor Webpack',
  contentSecurityPolicy: genCSP({
    isDev: isDebug,
    additional: {
    },
  }),
  version: Version,
  geckoKey: 'trezor-webpack',
});
