import styles from './styles.less';
import { FC } from 'react';
import WithTitle from '../title';
import Board from '../board';
import { DataRecordType } from '@/types';
export interface ChartsProps {
  selected: DataRecordType;
}
const Charts: FC<ChartsProps> = ({ selected }) => {
  const values = selected?.result?.split(/\s/).map((item) => Number(item));
  return (
    <div className={styles.charts}>
      <WithTitle
        name={
          <span>
            千位[{selected?.date}][{selected?.result}]
          </span>
        }
      >
        <Board isActive={(_, value) => values?.[0] == value} />
      </WithTitle>

      <WithTitle
        name={
          <span>
            百位[{selected?.date}][{selected?.result}]
          </span>
        }
      >
        <Board isActive={(_, value) => values?.[1] == value} />
      </WithTitle>

      <WithTitle
        name={
          <span>
            个位[{selected?.date}][{selected?.result}]
          </span>
        }
      >
        <Board isActive={(_, value) => values?.[2] == value} />
      </WithTitle>
    </div>
  );
};
export default Charts;
