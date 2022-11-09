export type TypographyProps = React.HTMLAttributes<HTMLParagraphElement> & {
  as?: React.ElementType;
  variant?: keyof typeof typographyVariants;
  className?: string;
  children?: React.ReactNode;
};

export const typographyVariants = {
  title: {
    tag: "h1",
    tailwindClasses: "text-4xl",
  },
  subtitle: {
    tag: "h2",
    tailwindClasses: "text-3xl",
  },
  heading1: {
    tag: "h3",
    tailwindClasses: "text-2xl",
  },
  heading2: {
    tag: "h4",
    tailwindClasses: "text-xl",
  },
  body1: {
    tag: "p",
    tailwindClasses: "text-base",
  },
  body2: {
    tag: "p",
    tailwindClasses: "text-sm",
  },
  button1: {
    tag: "span",
    tailwindClasses: "text-base",
  },
  button2: {
    tag: "span",
    tailwindClasses: "text-sm",
  },
  button3: {
    tag: "span",
    tailwindClasses: "text-2xs",
  },
  caption1: {
    tag: "span",
    tailwindClasses: "text-xs",
  },
  caption2: {
    tag: "span",
    tailwindClasses: "text-2xs",
  },
};
