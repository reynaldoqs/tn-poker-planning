import {
  faAccessibleIcon,
  faDiscord,
  faSlack,
} from "@fortawesome/free-brands-svg-icons";

import { FeatureCard } from "~/components/molecules";

const features = [
  {
    title: "Discord",
    description: "Friendly bot that allows to manage rooms",
    icon: faDiscord,
    className: "text-[#6c82cf]",
  },
  {
    title: "Slack",
    description: "Friendly bot that allows to manage rooms",
    icon: faSlack,
    className: "text-[#cedec8]",
  },
  {
    title: "Accessible",
    description: "Plannings usable to as many people as possible",
    icon: faAccessibleIcon,
    className: "text-[#2cad77]",
  },
];

export const DropRoot: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  props
) => (
  <section className="relative flex flex-col gap-9">
    <div>
      <h1 className="text-center text-5xl font-black text-primary md:text-left">
        Scrum Planning?
      </h1>
      <h2 className="text-center text-4xl font-black text-txtLight md:text-left">
        Make it easy, magic.
      </h2>
    </div>
    <p className="text-md text-center font-semibold text-txtDark md:text-left">
      Create better estimates, healthier sprints, and happier teams.
      <br /> With tons of advantages:
    </p>
    <div className="flex select-none flex-wrap items-center justify-center gap-8  md:justify-start md:gap-4 lg:gap-8">
      {features.map(({ title, description, icon, className }) => (
        <FeatureCard
          key={title}
          icon={icon}
          title={title}
          description={description}
          iconClassName={className}
        />
      ))}
    </div>
  </section>
);
