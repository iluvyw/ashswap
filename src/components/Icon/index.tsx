import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import classnames from 'classnames';

interface IconProps {
  defaultSrc: StaticImageData;
  hoverSrc: StaticImageData;
  focusSrc: StaticImageData;
  className?: string;
  width?: number;
  height?: number;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Icon: React.FC<IconProps> = ({
  defaultSrc,
  hoverSrc,
  focusSrc,
  width,
  height,
  className,
  onClick,
}) => {
  const [stateIcon, setStateIcon] = useState<'DEFAULT' | 'HOVER' | 'FOCUS'>(
    'DEFAULT'
  );

  const getSource = () => {
    switch (stateIcon) {
      case 'DEFAULT':
        return defaultSrc;
      case 'HOVER':
        return hoverSrc;
      case 'FOCUS':
        return focusSrc;
    }
  };
  return (
    <div
      onMouseEnter={() => setStateIcon('HOVER')}
      onClick={e => {
        setStateIcon('FOCUS');
        onClick && onClick(e);
      }}
      onMouseLeave={() => setStateIcon('DEFAULT')}
    >
      <Image
        src={getSource()}
        width={width}
        height={height}
        className={classnames(className)}
      />
    </div>
  );
};

export default Icon;
