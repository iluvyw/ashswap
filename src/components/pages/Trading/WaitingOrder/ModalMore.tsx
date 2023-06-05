import Modal from 'src/components/Modal';
import Image from 'next/image';
import { Eye2Icon, EyeSlashIcon, TextAlignRightIcon } from '@/assets';
import { useRecoilState } from 'recoil';
import { arrangeTheInfoState } from '@/recoil/states/arrangeTheInfo';

type ModalMoreProps = {
  onClose: () => void;
};
const ModalMore: React.FC<ModalMoreProps> = ({ onClose }) => {
  const [arrangeTheInfo, setArrangeTheInfoState] =
    useRecoilState(arrangeTheInfoState);

  const onHoverField = (_id: number | string, _isHover: boolean) => {
    setArrangeTheInfoState({
      items: arrangeTheInfo.items.map(value => {
        if (value.id == _id) {
          return { ...value, isHover: _isHover };
        }
        return value;
      }),
    });
  };

  const onShowItem = (_id: number | string, _show: boolean) => {
    setArrangeTheInfoState({
      items: arrangeTheInfo.items.map(value => {
        if (value.id == _id) {
          return { ...value, show: _show, isHover: false };
        }
        return value;
      }),
    });
  };

  return (
    <Modal header="Arrange the information" onClose={onClose}>
      <div className="flex">
        <div className="w-1/2 border-r border-r-blackBg pr-2">
          {arrangeTheInfo.items.map(value => (
            <div
              onMouseOver={() => onHoverField(value.id, true)}
              onMouseOut={() => onHoverField(value.id, false)}
              onClick={() => onShowItem(value.id, false)}
              className={` flex ${
                value.show ? 'mb-2 h-10 py-2' : 'h-0 py-0'
              } cursor-pointer items-center justify-between overflow-hidden rounded-xl px-4  transition-all duration-200 hover:bg-blueBg`}
              data-cy={`hide-eye-${value.id}`}
            >
              <div className="flex items-center">
                <Image src={value.isHover ? EyeSlashIcon : Eye2Icon} />
                <span className="text-xs font-bold">{value.text}</span>
              </div>
              {value.isHover ? <Image src={TextAlignRightIcon} /> : null}
            </div>
          ))}
        </div>
        <div className="w-1/2 pl-4">
          {arrangeTheInfo.items.map(value => (
            <div
              onMouseOver={() => onHoverField(value.id, true)}
              onMouseOut={() => onHoverField(value.id, false)}
              onClick={() => onShowItem(value.id, true)}
              className={`flex ${
                !value.show ? 'mb-2 h-10 py-2' : 'h-0 py-0'
              } cursor-pointer items-center overflow-hidden rounded-xl px-4  transition-all duration-200 hover:bg-blueBg`}
              data-cy={`show-eye-${value.id}`}
            >
              <Image src={!value.isHover ? EyeSlashIcon : Eye2Icon} />
              <span className="text-xs font-bold">{value.text}</span>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
export default ModalMore;
