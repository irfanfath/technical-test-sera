import { FC, ReactNode } from 'react';

interface IModal {
  show: boolean;
  children: ReactNode;
}

const Modal: FC<IModal> = ({ show = false, children }) => {
  return (
    <div className={show ? 'modal modal--active' : 'modal'}>
      <div className="modal__inner">{children}</div>
    </div>
  );
};

export default Modal;
