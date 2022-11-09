import { DialogProps } from "@radix-ui/react-dialog";

export type ModalProps = DialogProps & {
  title: string;
  description?: string;
  children?: React.ReactNode;
};
