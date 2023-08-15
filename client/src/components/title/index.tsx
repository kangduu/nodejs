import styles from './styles.less';
import { FC, PropsWithChildren } from 'react';
export interface WithTitle {
  name: React.ReactNode;
}
const WithTitle: FC<PropsWithChildren<WithTitle>> = ({ name, children }) => {
  return (
    <div className={styles.chart}>
      <h2 className={styles.title}>{name}</h2>
      {children}
    </div>
  );
};
export default WithTitle;
