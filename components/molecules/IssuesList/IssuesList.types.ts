import { RoomConfig } from '~/types';

export type IssuesListProps = {
  roomConfig: RoomConfig;
  onIssuesUpdate?: (issues: RoomConfig['issues']) => void;
};
