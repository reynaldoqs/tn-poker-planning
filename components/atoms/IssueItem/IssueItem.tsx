import { Button } from "../Button";
import { IssueItemProps } from "./IssueItem.types";

export const IssueItem: React.FC<IssueItemProps> = ({ issue }) => (
  <div className="rounded-xl bg-bgLight px-4 py-3">
    <section className="flex items-center gap-4">
      <div>
        <h4 className="text-sm font-bold text-green-300">{issue.status}</h4>
      </div>
      <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-txtLight">
        {issue.name}
      </p>
      <div className="ml-auto">
        <Button
          title="Vote again"
          size="sm"
          className="whitespace-nowrap bg-secondary"
        />
      </div>
    </section>
  </div>
);
