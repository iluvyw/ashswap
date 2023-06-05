import { WaitingOrder } from '@/api/models';
import { ordersState } from '@/recoil/states/ordersState';
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
  const [orders, setOrders] = useRecoilState(ordersState);

  function removeItemAtIndex(arr: Array<WaitingOrder>, _id: number | string) {
    return arr.filter(value => value.id != _id);
  }

  const handleDeleted = () => {
    if (idSelected) setOrders(removeItemAtIndex(orders, idSelected));
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
          className="btn-big btn-danger font-bold"
          onClick={handleDeleted}
          data-cy="yes-delete-btn"
        >
          Yes, Cancel now
        </button>
        <button className="btn-big btn-outlined font-bold" onClick={onClose}>
          Go back
        </button>
      </div>
    </Modal>
  );
};
export default ModalCancelOrder;
