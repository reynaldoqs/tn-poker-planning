// https://framerbook.com/animation/example-animations/21-keyframes-position-and-color/ check
// https://framerbook.com/animation/example-animations/28-variants-staggered-animation/ to show results
import Image from 'next/image';

import { LocalBoardStatus } from '~/types';
import { GameStateContentProps } from './GameStateContent.types';
import { Button } from '~/components/atoms';

const elementsMap: Record<LocalBoardStatus, React.ReactElement> = {
  INIT: (
    <div className="relative h-36 w-40">
      <Image src="/assets/i_animal_1.svg" alt="vote" fill />
    </div>
  ),
  VOTING: (
    <div className="relative h-36 w-40">
      <Image src="/assets/i_animal_2.svg" alt="vote" fill />
    </div>
  ),
  SHOWING_RESULTS: (
    <div className="relative h-36 w-40">
      <Image src="/assets/i_animal_3.svg" alt="vote" fill />
    </div>
  ),
  COUNTING_DOWN: (
    <div className="relative h-36 w-40">
      <Image src="/assets/i_animal_4.svg" alt="vote" fill />
    </div>
  ),
};

const labelsMap: Record<LocalBoardStatus, string> = {
  INIT: 'Ready to start?',
  VOTING: 'Pick your cards!',
  SHOWING_RESULTS: 'Results',
  COUNTING_DOWN: 'Counting down',
};

const buttonTitleMap: Record<LocalBoardStatus, string> = {
  INIT: 'Start Game',
  VOTING: 'Reveal Results',
  SHOWING_RESULTS: 'Next round',
  COUNTING_DOWN: 'Next round',
};

export const GameStateContent: React.FC<GameStateContentProps> = ({
  state,
  hasControls,
  onNextGameState,
}) => {
  const Content = elementsMap[state];
  return (
    <div className="flex flex-col gap-6 p-3">
      <h4 className="text-center text-lg text-emerald-200">
        {labelsMap[state]}
      </h4>
      {Content}
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
