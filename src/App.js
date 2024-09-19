import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { contadorAdd, contadorDel } from "./redux/stores/contador/contador";
import { modalOpen, modalClose } from "./redux/stores/modal/modal";
import { login } from "./redux/stores/login/login";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const contador = useSelector((state) => state.contador);
  const modal = useSelector((state) => state.modal);
  const token = useSelector((state) => state.login.token);
  const user = useSelector((state) => state.login.user);
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(login({ username, password }));

    setUsername("");
    setPassword("");
    return e.target.reset();
  }

  function capitalizeFirstLetter(string) {
    const trimmedString = string.trim();
    return trimmedString.charAt(0).toUpperCase() + trimmedString.slice(1);
  }

  function validateToken() {
    if (token?.data)
      return "Tem token para o usuário: " + token.data.user_display_name;
    if (token?.error) {
      let string = token.error.replace("<strong>Erro:</strong>", "");
      string = capitalizeFirstLetter(string);
      return string;
    } else {
      return "Necessário efetuar login para setor o token";
    }
  }

  function validateUser() {
    if (user?.data?.username) return "Usuário logado : " + user.data.username;
    if (user?.error) {
      let string = user.error.replace("<strong>Erro:</strong>", "");
      string = capitalizeFirstLetter(string);
      return string;
    } else {
      return "Necessario ter um token";
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
          <p>{token?.loading ? "Buscando token..." : validateToken()}</p>
          <p>{user?.loading ? "Buscando usuário..." : validateUser()}</p>
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
            style={{ padding: "5px" }}
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
            style={{ padding: "5px" }}
            id="password"
            name="password"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            autoComplete=""
          />
          <button
            style={{
              width: "30%",
              alignSelf: "flex-end",
              marginTop: "15px",
              padding: "5px",
            }}
            type="submit"
          >
            Logar
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
