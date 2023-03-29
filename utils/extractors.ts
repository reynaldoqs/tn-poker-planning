import {
  faGoogle,
  faGithub,
  faFacebook,
  faChrome,
  faFirefoxBrowser,
  faEdge,
  faEdgeLegacy,
  faSafari,
  faOpera,
} from '@fortawesome/free-brands-svg-icons';
import { ZodIssue } from 'zod';

import { AUTH_PROVIDERS } from '~/constants';
import { Room } from '~/types';

const extractBrowserIcon = () => {
  const userAgent = navigator.userAgent;

  if ((userAgent.indexOf('Opera') || userAgent.indexOf('OPR')) != -1)
    return faOpera;
  if (userAgent.indexOf('Edg') != -1) return faEdge;
  if (userAgent.indexOf('Chrome') != -1) return faChrome;
  if (userAgent.indexOf('Safari') != -1) return faSafari;
  if (userAgent.indexOf('Firefox') != -1) return faFirefoxBrowser;

  return faEdgeLegacy;
};

export const extractProviderIcon = (provider?: keyof typeof AUTH_PROVIDERS) => {
  if (!provider) return faEdgeLegacy;
  if (provider === 'facebook') return faFacebook;
  if (provider === 'github') return faGithub;
  if (provider === 'google') return faGoogle;

  return extractBrowserIcon();
};

export const extractErrorMsg = (err: ZodIssue) =>
  `${err.path.at(-1)} ${err.message.toLocaleLowerCase()}`;

export const extractParticipant = (room: Room, playerId: string) => {
  return room.players.find((p) => p.playerId === playerId)!;
};

export const getOffset = (el: HTMLElement | null) => {
  if (!el) return { x: 0, y: 0 };
  const rect = el.getBoundingClientRect();
  return {
    x: rect.left + window.scrollX,
    y: rect.top + window.scrollY,
  };
};
