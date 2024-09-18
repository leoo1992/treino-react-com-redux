import { useSelector, useDispatch } from "react-redux";
import { contadorAdd, contadorDel } from "./redux/stores/contador/contador";
import { modalOpen, modalClose } from "./redux/stores/modal/modal";

function App() {
  const dispatch = useDispatch();
  const { contador, modal } = useSelector((state) => state);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div>
        <h1>Total: {contador.total}</h1>
        <button onClick={() => dispatch(contadorAdd())}>+</button>
        <button onClick={() => dispatch(contadorDel())}>-</button>
      </div>

      <div style={{ display: modal.open ? "none" : "block" }}>
        <button onClick={() => dispatch(modalOpen())}>Abrir Modal</button>
      </div>

      <div style={{ display: modal.open ? "block" : "none" }}>
        <button onClick={() => dispatch(modalClose())}>Fechar Modal</button>
        <h1>MODAL</h1>
      </div>
    </div>
  );
}

export default App;
