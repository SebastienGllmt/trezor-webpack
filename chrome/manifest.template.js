export default ({
  description,
  defaultTitle,
  contentSecurityPolicy,
  versionName,
  extensionKey,
  geckoKey,
  iconOverride,
  version,
}) => {
  const icons = iconOverride == null
    ? {
      /* eslint-disable quote-props */
      '48': 'img/48.png',
      /* eslint-enable quote-props */
    }
    : iconOverride;
  const base = {
    version,
    // the name shown in chrome://extensions
    // we also reuse this to choose the filename on disk
    name: defaultTitle,
    manifest_version: 2,
    description,
    browser_action: {
      default_title: defaultTitle,
      default_icon: icons,
    },
    browser_specific_settings: {
      gecko: {
        id: geckoKey,
      },
    },
    icons,
    background: {
      page: 'background.html',
    },
    permissions: [
      'storage',
      '*://connect.trezor.io/*',
    ],
    content_scripts: [
      {
        matches: ['*://connect.trezor.io/*/popup.html'],
        js: ['js/trezor-content-script.js'],
      },
    ],
    content_security_policy: contentSecurityPolicy,
  };

  const verName = versionName != null
    ? { version_name: versionName }
    : Object.freeze({});
  const extKey = extensionKey != null
    ? { key: extensionKey }
    : Object.freeze({});
  return {
    ...verName,
    ...base,
    ...extKey,
  };
};
