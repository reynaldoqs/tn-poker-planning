import { RoomConfig } from '~/types';

export type IssueItemProps = {
  issue: Exclude<RoomConfig['issues'], undefined>[number];
};
