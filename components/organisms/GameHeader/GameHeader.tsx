import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useBoundStore } from '~/stores';

export const GameHeader: React.FC = () => {
  const roomConfig = useBoundStore((state) => state.roomConfig);
  const nextIssue = roomConfig.issues?.find((issue) => issue.status === 'TODO');

  const handleCopyRoomUrl = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <header className="h-fit p-5">
      <h1
        className="cursor-pointer text-xl font-bold text-txtMedium active:opacity-50"
        onClick={handleCopyRoomUrl}
      >
        <span className="text-1xl mr-1 font-bold text-purple-200 opacity-60">
          #
        </span>
        {roomConfig.title}
        <FontAwesomeIcon className="ml-3 text-[14px]" icon={faCopy} />
      </h1>
      {nextIssue && (
        <p className="text-sm font-bold text-txtDark">{nextIssue.name}</p>
      )}
    </header>
  );
};
