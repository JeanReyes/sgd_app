import css from 'styled-jsx/css';
const modal = css`
  .modal-portal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
  }

  .modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .modal-header {
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: bold;
  }

  .modal-body {
    margin-bottom: 20px;
  }

  .modal-footer {
    text-align: right;
  }

  .modal-button {
    padding: 8px 16px;
    border-radius: 3px;
    background-color: #2196f3;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
  }

  .modal-button:hover {
    background-color: #0d8bf0;
  }
`;

export { modal };
