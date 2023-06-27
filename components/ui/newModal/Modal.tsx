import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { modal } from './modal.style';

interface Props {
  activator: (click: () => void) => void;
  children: JSX.Element;
}

export const NewModal = ({ children, activator }: Props) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  useEffect(() => {
    console.log(showModal);
  }, [showModal]);

  return (
    <>
      {activator(toggleModal)}
      {showModal &&
        createPortal(
          <div className="modal-portal">
            <div className="modal-content">
              <button onClick={() => setShowModal(false)}>Cerrar</button>
              {children}
            </div>
          </div>,
          window.document.body
        )}
      <style jsx>{modal}</style>
    </>
  );
};

//call modal
{
  /* <NewModal activator={(click: () => void) => <p onClick={click}>Modal</p>}>
<div>
  <div className="modal-header">
    <h1>Este es un modal</h1>
  </div>
  <div className="modal-body">
    <p>Puedes poner cualquier contenido aquí.</p>
  </div>
  <div className="modal-footer">Footer</div>
</div>
</NewModal> */
}
