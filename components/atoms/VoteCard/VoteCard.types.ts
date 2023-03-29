export type VoteCardProps = React.HTMLAttributes<HTMLDivElement> & {
  value: string;
  cardBackgroundImg?: string;
  showVoteValue?: boolean;
  name?: string;
};
