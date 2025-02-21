import styles from "./Card.module.css";
import PropTypes from "prop-types";

const Card = ({ text, img, onClick }) => {
  return (
    <button className={styles.card} onClick={onClick}>
      <div className={styles["pokemon-image"]}>
        <img src={img} alt={text} />
      </div>
      <span className={styles["pokemon-name"]}>{text}</span>
    </button>
  );
};

Card.propTypes = {
  text: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Card;
