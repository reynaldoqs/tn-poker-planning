import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

export const GameHeader: React.FC = () => {
  return (
    <header className="h-fit p-5">
      <h1 className="cursor-pointer text-xl font-bold text-txtMedium active:opacity-50">
        <span className="mr-1 text-2xl font-bold text-purple-200 opacity-60">
          #
        </span>
        <span className="mr-2 text-2xl font-bold text-blue-200 opacity-60">
          /
        </span>
        Poker planning <FontAwesomeIcon className="ml-3" icon={faCopy} />
      </h1>
      <p className="text-md font-bold text-txtDark">LEAP-5243</p>
    </header>
  );
};
