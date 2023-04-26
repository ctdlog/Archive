import ReactDOM from 'react-dom';

interface ChildrenProps {
  children: React.ReactNode;
}

const Modal = ({ children }: ChildrenProps) => {
  const element =
    typeof window !== 'undefined' && document.querySelector('#modal-root');
  return element && children ? ReactDOM.createPortal(children, element) : null;
};

const Background = ({ children }: ChildrenProps) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9,
      }}
    >
      {children}
    </div>
  );
};

const Layout = ({ children }: ChildrenProps) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
      }}
    >
      {children}
    </div>
  );
};

Modal.Background = Background;
Modal.Layout = Layout;

export default Modal;
