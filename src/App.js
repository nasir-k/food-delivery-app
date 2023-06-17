import { useState } from "react";
import Cart from "./components/Cart/Cart";

import Header from "./components/Layout/Header";
import CartProvider from "./store/CartProvider";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { routes } from "./routes/routes";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const navigate = useNavigate();

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              route.path === "/" ? <Navigate to="meals" /> : <route.element />
            }
          ></Route>
        ))}
      </Routes>
      </main>
    </CartProvider>
  );
}

export default App;
