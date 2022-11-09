import { forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { InputProps } from "./Input.types";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      actionTitle,
      actionIcon,
      errorMessage,
      onActionClick,
      className,
      ...rest
    },
    ref
  ) => (
    <div className={`relative ${className}`}>
      <div className="flex h-10 w-full items-center rounded-lg bg-bgDark pr-1">
        <input
          ref={ref}
          type="text"
          autoComplete="off"
          className="h-full w-full flex-1 rounded-lg bg-bgDark px-3 text-sm placeholder:text-txtDark focus:outline-none"
          {...rest}
        />
        {(actionTitle || actionIcon) && (
          <button
            className="flex items-center whitespace-nowrap rounded-md bg-bgMedium px-3 py-2 text-xs text-txtLight active:opacity-20"
            onClick={(e) => {
              e.preventDefault();
              onActionClick?.();
            }}
          >
            {actionIcon && <FontAwesomeIcon icon={actionIcon} size="1x" />}
            {actionTitle && <span className="ml-2">{actionTitle}</span>}
          </button>
        )}
      </div>
      {errorMessage && (
        <span className="absolute -bottom-[25px] max-w-full truncate text-sm text-error first-letter:capitalize">
          {errorMessage}
        </span>
      )}
    </div>
  )
);

Input.displayName = "Input";
