import * as styles from "./styles.module.css";

export const ListItem = (props) => (
  <div
    style={props.style}
    className={styles.listItem}
    tabIndex={props.tabIndex}
    role="listitem"
  >
    <div>{props.item}</div>
  </div>
);
