import { WaitingFuture } from '@/api/models';
import { futuresState } from '@/recoil/states/futuresState';
import { useRecoilState } from 'recoil';
import Modal from 'src/components/Modal';

type ModalCancelOrderProps = {
  onClose: () => void;
  idSelected?: number | string;
};
const ModalCancelOrder: React.FC<ModalCancelOrderProps> = ({
  onClose,
  idSelected,
}) => {
  const [futureOrders, setFutureOrders] = useRecoilState(futuresState);

  function removeItemAtIndex(arr: Array<WaitingFuture>, _id: number | string) {
    return arr.filter(value => value.id != _id);
  }

  const handleDeleted = () => {
    if (idSelected)
      setFutureOrders(removeItemAtIndex(futureOrders, idSelected));
    onClose();
  };

  return (
    <Modal
      header="Cancel this order?"
      onClose={onClose}
      headerSize="lg"
      width={324}
    >
      <span className="block text-sm font-bold text-blackDefault">
        You have to sign 1 transaction(s) to cancel this order
      </span>
      <div className="mt-8">
        <div className="flex justify-between">
          <span>Platform Fee</span>
          <span className="text-xs text-disabled">$0.15</span>
        </div>
        <div className="mt-4 flex justify-between">
          <span>Network Gas Fee</span>
          <span className="text-xs text-disabled">$0.03</span>
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-4">
        <button
          className="btn-big bg-black font-bold text-white duration-200 hover:drop-shadow-lg"
          onClick={onClose}
        >
          Go back
        </button>
        <button
          className="btn-big font-bold text-[#FF005C] duration-200 hover:text-[#A5A6F6]"
          onClick={handleDeleted}
          data-cy="yes-delete-btn"
        >
          Yes, Cancel now
        </button>
      </div>
    </Modal>
  );
};
export default ModalCancelOrder;
