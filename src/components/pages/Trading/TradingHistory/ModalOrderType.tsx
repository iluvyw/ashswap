import React, { useState } from 'react';
import Modal from 'src/components/Modal';
import Checkbox from '@/components/Checkbox';

type ModalOrderTypeProps = {
  onClose: () => void;
};
const ModalOrderType: React.FC<ModalOrderTypeProps> = ({ onClose }) => {
  const [checkedBox, setCheckedBox] = useState<boolean[]>([true, false, false]);
  function handleNewSet(index: number, value: boolean) {
    const newSet = [...checkedBox];
    newSet[index] = value;
    setCheckedBox(newSet);
  }

  return (
    <Modal header="Select Order Type" width={270} onClose={onClose}>
      <div className="flex flex-col gap-8 p-3">
        <Checkbox
          id="limitOrder"
          label="Limit Order"
          checked={checkedBox[0]}
          onChange={value => handleNewSet(0, value)}
        />
        <Checkbox
          id="long"
          label="Long"
          checked={checkedBox[1]}
          onChange={value => handleNewSet(1, value)}
        />
        <Checkbox
          id="short"
          label="Short"
          checked={checkedBox[2]}
          onChange={value => handleNewSet(2, value)}
        />
      </div>
    </Modal>
  );
};
export default ModalOrderType;
