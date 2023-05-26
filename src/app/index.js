import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import { Route, Routes, useLocation } from "react-router-dom";
import { APP_ROUTES } from "../utils/const";
import Product from "./product";
import { useEffect } from "react";
import useStore from "../store/use-store";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);
  const location = useLocation()
  const store = useStore();

  useEffect(() => {
    store.actions.modals.close()
  }, [location])

  return (
    <>
      <Routes>
        <Route path={APP_ROUTES.MAIN_PAGE} element={<Main />} />
        <Route path={APP_ROUTES.PRODUCT_PAGE} element={<Product />} />
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
