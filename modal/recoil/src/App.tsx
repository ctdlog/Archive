import reactLogo from './assets/react.svg';
import './App.css';
import useModal from './hooks/useModal';

function App() {
  const testModal1 = useModal('test1');
  const testModal2 = useModal('test2');

  return (
    <>
      <div>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          marginTop: '1rem',
        }}
      >
        <button
          onClick={() => {
            console.log('clicked');
            testModal1.openModal();
          }}
        >
          Open Test Modal 1
        </button>
        <button onClick={testModal2.openModal}>Open Test Modal 2</button>
      </div>
    </>
  );
}

export default App;
