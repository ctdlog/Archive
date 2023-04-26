import Modal from './Modal';
import useModal from '../hooks/useModal';

const TestModal2 = () => {
  const { closeModal } = useModal('test2');

  return (
    <Modal.Background>
      <Modal.Layout>
        <div
          style={{
            backgroundColor: 'white',
            padding: '1rem',
          }}
        >
          <button onClick={closeModal}>Close</button>
          <h1
            style={{
              color: 'black',
            }}
          >
            Test Modal 2
          </h1>
        </div>
      </Modal.Layout>
    </Modal.Background>
  );
};

export default TestModal2;
