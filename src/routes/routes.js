import Cart from "../components/Cart/Cart";
import Meals from "../components/Meals/Meals";
import DeliveryUpdate from "../screens/DeliveryUpdate/DeliveryUpdate";
import ThanksMessageScreen from "../screens/ThanksMessageScreen/ThanksMessageScreen";

export const routes = [
    {
      label: "Default",
      path: "/",
      element: Meals,
    },
    {
        label: "meals",
        path: "/meals",
        element: Meals,
    },
    {
        label: "cart",
        path: "/cart",
        element: Cart,
    },
    {
      label: "delivery-update",
      path: "/delivery-update",
      element: DeliveryUpdate,
    },
    {
    label: "thankyou-page",
    path: "/thankyou-page",
    element: ThanksMessageScreen,
    },
  ];