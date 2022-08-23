import Success from "./success";
import styles from "./message.module.css";

const Message = ({ children }: { children: string }) => {
  return (
    <p className={styles.message}>
      <Success />
      {children}
    </p>
  );
};

export default Message;
