export type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  title: string;
  size?: 'lg' | 'md' | 'sm';
  variant?: 'primary' | 'secondary';
  outlined?: boolean;
  disabled?: boolean;
};
