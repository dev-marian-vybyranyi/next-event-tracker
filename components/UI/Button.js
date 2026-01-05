import Link from "next/link";
import classes from "./Button.module.css";

const Button = ({ children, link, onClick }) => {
  if (!link) {
    return <button className={classes.btn} onClick={onClick}>{children}</button>;
  }

  return (
    <Link href={link} className={classes.btn}>
      {children}
    </Link>
  );
};

export default Button;
