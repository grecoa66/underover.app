import { Transition } from "@headlessui/react";
import { ReactNode } from "react";

export const MenuTransition = ({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: ReactNode;
}) => {
  return (
    <Transition
      show={isOpen}
      enter="transition-opacity duration-175"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-175"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {children}
    </Transition>
  );
};
