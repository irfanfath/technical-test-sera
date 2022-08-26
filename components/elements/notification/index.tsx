import { FC, useState, useEffect } from 'react';

interface INotification {
  type?: string;
  content: string;
}

const Notification: FC<INotification> = ({ type = 'success', content }) => {
  const [isShow, setShow] = useState(true);

  const handleClose = (e: any) => {
    e.preventDefault();
    setShow(false);
  };

  useEffect(() => {
    if (isShow) {
      const timeOut = setTimeout(() => setShow(false), 3000);
      return () => {
        clearTimeout(timeOut);
      };
    }
  }, [isShow]);

  return (
    <div
      className={
        isShow
          ? `notification notification--active notification--${type}`
          : `notification notification--${type}`
      }
    >
      <div className="notification__inner">{content}</div>
      <button className="notification__close" onClick={handleClose}>
        x
      </button>
    </div>
  );
};

export default Notification;
