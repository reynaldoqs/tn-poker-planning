import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { Button, Input, IssueItem } from '~/components/atoms';
import type { RoomConfig } from '~/types';

import type { IssuesListProps } from './IssuesList.types';

export const IssuesList: React.FC<IssuesListProps> = ({
  roomConfig: { issues, title },
  onIssuesUpdate,
}) => {
  const [showInput, setShowInput] = useState(!issues?.length);
  const inputRef = useRef<HTMLInputElement>(null);

  const onSaveHandler = () => {
    const issueName = inputRef.current?.value;
    if (issueName) {
      const newIssue: Exclude<RoomConfig['issues'], undefined>[number] = {
        name: issueName,
        status: 'TODO',
      };
      const updatedIssues: RoomConfig['issues'] = [...(issues || []), newIssue];
      onIssuesUpdate?.(updatedIssues);
      setShowInput(false);
    }
  };

  return (
    <div className="flex w-96 flex-col gap-4">
      <header className="flex flex-col items-start">
        <h3 className="text-base font-semibold text-txtLight">
          {title} Issues
        </h3>
        <p className="text-sm text-txtDark">{issues?.length || 0} issues</p>
      </header>
      <div className="flex flex-col gap-2">
        {issues?.map((issue, index) => (
          <IssueItem key={index} issue={issue} />
        ))}
      </div>
      <footer className="flex flex-col items-start">
        {showInput ? (
          <div className="flex w-full flex-col gap-3">
            <Input ref={inputRef} placeholder="Enter a title for the issue" />
            <div className="flex gap-3">
              <Button
                onClick={() => setShowInput(false)}
                title="Cancel"
                className="flex-1 bg-transparent"
              />
              <Button onClick={onSaveHandler} title="Save" className="flex-1" />
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowInput(true)}
            className="rounded-xl py-2 px-4 text-lg font-semibold text-txtMedium hover:bg-bgDark"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-3" /> Add another issue
          </button>
        )}
      </footer>
    </div>
  );
};
