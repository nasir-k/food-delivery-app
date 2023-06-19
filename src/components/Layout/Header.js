import { Fragment } from "react";

import HeaderCartButton from "./HeaderCartButton";
import mealsImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import { useNavigate } from "react-router-dom";

const Header = (props) => { 
  const navigate = useNavigate();
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Kitchen</h1>
      <HeaderCartButton onClick={()=>{navigate("/cart")}} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </Fragment>
  );
};

export default Header;
