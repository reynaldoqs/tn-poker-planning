export const AUTH_PROVIDERS = {
  facebook: 'facebook',
  google: 'google',
  browser: 'browser',
  github: 'github',
  //googleOneTap: "googleOneTap",
} as const;

export const BOARD_STATUS = [
  'IDLE',
  'VOTING',
  'SHOWING_RESULTS',
  //"PREPARING_NEXT_ROUND",
] as const;

export const COUNTDOWN_IN_SECONDS = 3;
// @TODO: Check if PREPARING_NEXT_ROUND state is needed
// countdown depends on client at 100%
// INIT: state to show everything before to start playing tutorial or something similar (not used yet)
// VOTING: state to show the board and start the game
// SHOWING_RESULTS: state to show the results of the game
// PREPARING_NEXT_ROUND: state to show the results of the game and prepare for the next round

export const ISSUE_STATUS = ['TODO', 'IN_PROGRESS', 'DONE'] as const;

export const MANAGE_OPTIONS = ['OWNER', 'ANYONE'] as const;

export const VOTE_TYPES = ['NUMBER', 'STRING'] as const;

export const PLAYER_STATUS = ['CONNECTED', 'DISCONNECTED', 'LEFT'] as const;

export const PLAYER_TYPES = ['PLAYER', 'OBSERVER'] as const;

export const AVAILABLE_REACTIONS = ['LIKE', 'DISLIKE'] as const;

export const DECK_CARDS = {
  fibonacci: {
    type: 'STRING',
    values: ['0', '1', '2', '3', '5', '8', '13', '21', '34', '55'],
  },
  powerOfTwo: {
    type: 'NUMBER',
    values: ['0', '1', '2', '4', '8', '16', '32', '64'],
  },
};
export const DECK_OPTIONS = [
  {
    label: 'Fibonacci ( 0, 1, 2, 3, 5, 8, 13, 21, 34, 55)',
    value: 'fibonacci',
  },
  {
    label: 'Powers of 2 ( 0, 1, 2, 4, 8, 16, 32, 64 )',
    value: 'powerOfTwo',
  },
];

export const LOCAL_USER_KEY = '[AUDI::015]:local_user';
