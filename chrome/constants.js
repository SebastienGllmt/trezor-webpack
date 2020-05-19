import {
  Ports,
  portToPermission,
  portToSocketPermission,
} from '../scripts/connections';

export const Version = '1.0.0';

export function genCSP(request) {
  const defaultSrc = request.additional['default-src'] ?? [];
  const frameSrc = request.additional['frame-src'] ?? [];
  const scriptSrc = request.additional['script-src'] ?? [];
  const objectSrc = request.additional['object-src'] ?? [];
  const connectSrc = request.additional['connect-src'] ?? [];
  const styleSrc = request.additional['style-src'] ?? [];
  const imgSrc = request.additional['img-src'] ?? [];

  if (request.isDev) {
    defaultSrc.push(portToPermission(Ports.WebpackDev));

    scriptSrc.push(portToPermission(Ports.WebpackDev));
    scriptSrc.push("'unsafe-eval'");

    connectSrc.push(portToPermission(Ports.WebpackDev));
    connectSrc.push(portToSocketPermission(Ports.WebpackDev));

    imgSrc.push(portToPermission(Ports.WebpackDev));
  }

  frameSrc.push('https://connect.trezor.io/');

  return [
    `default-src 'self' ${defaultSrc.join(' ')};`,
    `frame-src ${frameSrc.join(' ')};`,
    `script-src 'self' ${scriptSrc.join(' ')} blob:;`,
    `object-src 'self' ${objectSrc.join(' ')};`,
    `connect-src ${connectSrc.join(' ')};`,
    `style-src * 'self' ${styleSrc.join(' ')} blob:;`,
    `img-src 'self' ${imgSrc.join(' ')} data:;`,
  ].join(' ');
}
