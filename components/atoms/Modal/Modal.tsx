import * as DialogPrimitive from '@radix-ui/react-dialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

import type { ModalProps } from './Modal.types';

export const Modal: React.FC<ModalProps> = ({
  title,
  description,
  children,
  ...rest
}) => (
  <DialogPrimitive.Root {...rest}>
    {/* <DialogPrimitive.Trigger /> */}
    <DialogPrimitive.Portal className="z-50">
      <DialogPrimitive.Overlay className="fixed top-0 left-0 z-50 h-full w-full bg-bgDark/80" />
      <DialogPrimitive.Content className="fixed top-1/2 left-1/2 z-50 max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-xl bg-bgMedium px-7 py-8 text-center">
        <DialogPrimitive.Title className="text-xl font-bold text-txtLight">
          {title}
        </DialogPrimitive.Title>

        {description && (
          <DialogPrimitive.Description className="mt-2 text-sm text-txtDark">
            {description}
          </DialogPrimitive.Description>
        )}
        <div className="mt-4">{children}</div>
        <DialogPrimitive.Close asChild>
          <button aria-label="Close" className="absolute top-3 right-4">
            <FontAwesomeIcon icon={faClose} />
          </button>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  </DialogPrimitive.Root>
);
