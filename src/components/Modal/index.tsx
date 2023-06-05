import React, { useEffect } from 'react';
import classnames from 'classnames';
import styles from './styles.module.css';

type PopupModalProps = {
  className?: string;
  classNameContainer?: string;
  header?: string;
  headerSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
  width?: number;
  children: React.ReactNode;
  onClose: () => void;
};

const PopupModal: React.FC<PopupModalProps> = ({
  children,
  className,
  classNameContainer,
  header,
  headerSize = 'sm',
  onClose,
  width = 506,
}) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      className={classnames(
        styles.backdrop,
        styles.show,
        'text-blackDefault',
        classNameContainer
      )}
    >
      <div
        className={classnames(
          className,
          styles.modal,
          header ? null : styles.noneHeader
        )}
        style={{ width }}
      >
        {header && (
          <>
            <div className={styles.header}>
              <span className={`text-${headerSize} font-bold`}>{header}</span>
              <button
                onClick={onClose}
                className="rounded-lg bg-blackDefault px-2 py-1 font-bold text-white"
              >
                ESC
              </button>
            </div>
            <hr className="my-6" />
          </>
        )}
        <div className={`${styles.content}`}>{children}</div>
      </div>
    </div>
  );
};

export default PopupModal;
