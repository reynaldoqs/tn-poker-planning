// https://framerbook.com/animation/example-animations/21-keyframes-position-and-color/ check
// https://framerbook.com/animation/example-animations/28-variants-staggered-animation/ to show results
import Image from 'next/image';

import { Button } from '~/components/atoms';
import type { LocalBoardStatus } from '~/types';

import type { GameStateContentProps } from './GameStateContent.types';

const labelsMap: Record<LocalBoardStatus, string> = {
  IDLE: 'Ready to start?',
  VOTING: 'Pick your cards!',
  SHOWING_RESULTS: 'Results',
  COUNTING_DOWN: 'Counting down',
};

const buttonTitleMap: Record<LocalBoardStatus, string> = {
  IDLE: 'Start Game',
  VOTING: 'Reveal Results',
  SHOWING_RESULTS: 'Next round',
  COUNTING_DOWN: 'Next round',
};

const accumulateVotesByValue = (votes: string[]) => {
  return votes.reduce((acc: { [key: string]: number }, vote: string) => {
    acc[vote] = acc[vote] ? acc[vote] + 1 : 1;
    return acc;
  }, {});
};

export const GameStateContent: React.FC<GameStateContentProps> = ({
  state,
  hasControls,
  votes,
  onNextGameState,
}) => {
  const elementsMap: Record<LocalBoardStatus, React.ReactElement> = {
    IDLE: <Image src="/assets/i_animal_1.svg" alt="vote" fill />,
    VOTING: <Image src="/assets/i_animal_2.svg" alt="vote" fill />,
    SHOWING_RESULTS: <>{JSON.stringify(accumulateVotesByValue(votes))}</>,
    COUNTING_DOWN: <Image src="/assets/i_animal_4.svg" alt="vote" fill />,
  };
  const Content = elementsMap[state];
  return (
    <div className="flex flex-col gap-6 rounded-xl bg-secondary p-5">
      <h4 className="text-sm">{labelsMap[state]}</h4>
      <div className="relative h-36 w-40"> {Content}</div>
      {hasControls && (
        <Button
          onClick={onNextGameState}
          title={buttonTitleMap[state]}
          disabled={state === 'COUNTING_DOWN'}
          outlined
        />
      )}
    </div>
  );
};
