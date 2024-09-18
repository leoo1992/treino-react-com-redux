import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { contadorAdd, contadorDel } from "./redux/stores/contador/contador";
import { modalOpen, modalClose } from "./redux/stores/modal/modal";
import { fetchToken } from "./redux/stores/login/login";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const contador = useSelector((state) => state.contador);
  const modal = useSelector((state) => state.modal);
  const login = useSelector((state) => state.login);

  async function handleSubmit(e) {
    e.preventDefault();

    if (username && password) {
      dispatch(fetchToken({ username, password }));

      setUsername("");
      setPassword("");
      await e.target.reset();
    }
  }

  function capitalizeFirstLetter(string) {
    const trimmedString = string.trim();
    return trimmedString.charAt(0).toUpperCase() + trimmedString.slice(1);
  }

  function validateUser() {
    if (login?.data?.user_display_name)
      return "Logado :" + login.data.user_display_name;

    if (login?.error) {
      let string = (login?.error).replace("<strong>Erro:</strong>", "");

      string = capitalizeFirstLetter(string);
      return string;
    } else {
      return "Necessario efetuar login";
    }
  }

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
        <div>
          <p>{login?.loading ? "Carregando..." : validateUser()}</p>
        </div>
      </div>

      <div>
        <h1>LOGIN</h1>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: ".5rem",
            width: "280px",
          }}
        >
          <label htmlFor="username">
            <span>Usuário : </span>
          </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />

          <label htmlFor="password">
            <span>Senha : </span>
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            autoComplete=""
          />

          <button style={{width :  "30%", alignItems: 'end', justifyContent:'flex-end'}} type="submit">Logar</button>
        </form>
      </div>
    </div>
  );
}

export default App;
