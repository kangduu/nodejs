import BoardMetaData, { BoardMetaDataKey } from '../../utils/meta';
import styles from './styles.less';
import { FC } from 'react';

export interface BoardProps {
  isActive?: (key: BoardMetaDataKey, value: number) => boolean;
}
const Board: FC<BoardProps> = ({ isActive }) => {
  return (
    <ul className={styles.container}>
      {Array.from(BoardMetaData.keys()).map((key, index) => {
        const value = BoardMetaData.get(key) as number;
        const active = isActive?.(key, value);
        return (
          <li
            className={active ? styles.active : ''}
            id={key.join('_')}
            key={index}
            data-set={key.toLocaleString()}
          >
            {value}
          </li>
        );
      })}
    </ul>
  );
};
export default Board;
