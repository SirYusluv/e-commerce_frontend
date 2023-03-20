import React from "react";
import { createPortal } from "react-dom";

function Modal({ children }: React.PropsWithChildren) {
  const el = document.getElementById("modal")!;
  return createPortal(<>{children}</>, el);
}

export default Modal;
