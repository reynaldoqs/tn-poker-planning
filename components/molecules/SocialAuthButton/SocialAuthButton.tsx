import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faGoogle,
  faFacebook,
  IconDefinition,
} from '@fortawesome/free-brands-svg-icons';

import { SocialAuthButtonProps } from './SocialAuthButton.types';

const providerIconMap: Record<
  SocialAuthButtonProps['provider'],
  IconDefinition
> = {
  facebook: faFacebook,
  google: faGoogle,
  github: faGithub,
};

export const SocialAuthButton: React.FC<SocialAuthButtonProps> = ({
  provider,
  className,
  ...rest
}) => (
  <button
    className={`flex h-fit w-fit items-center justify-center rounded-full active:opacity-20 ${className}`}
    {...rest}
  >
    <FontAwesomeIcon icon={providerIconMap[provider]} size="2x" />
  </button>
);
