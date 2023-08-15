import styles from './styles.less';
import { useEffect, useState } from 'react';
import { getDataList } from './request';
import { Table } from 'antd';
import { DataRecordType } from '@/types';
import Charts from '@/components/charts';

const PageSize = 20;

export default function IndexPage() {
  const [data, setData] = useState<DataRecordType[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pagesize: PageSize,
    total: 0,
    row: 0,
  });
  const [selected, setSelected] = useState<any>(null);

  const fetchData = (page?: number) =>
    getDataList({
      page: page || pagination.current,
      pagesize: pagination.pagesize,
    })
      .then((res: any) => {
        setSelected(res?.data?.[pagination.row || 0]);
        setData(res?.data || []);
        setPagination(
          res?.pagination || {
            current: 1,
            pagesize: PageSize,
            total: 0,
            row: 0,
          },
        );
      })
      .catch(() => {
        setSelected(null);
        setData([]);
        setPagination({ current: 1, pagesize: PageSize, total: 0, row: 0 });
      });

  useEffect(() => {
    fetchData();
  }, [pagination.current]);

  useEffect(() => {
    const { current, total, pagesize } = pagination,
      pages = Math.ceil(total / pagesize),
      row = data.findIndex((item) => item?.date === selected?.date) || 0,
      isLastPage = current === pages,
      isFirstPage = current === 1;

    const handler = (e: any) => {
      const setNewPagination = (page: number, row: number) => {
        setPagination((prev) => ({ ...prev, current: page, row }));
      };

      // 上一行
      if (e.key === 'ArrowUp') {
        const new_selected = data[row - 1];
        if (new_selected) setSelected(new_selected);
        else if (!isFirstPage) setNewPagination(current - 1, 19);
        return;
      }
      // 下一行;
      if (e.key === 'ArrowDown') {
        const new_selected = data[row + 1];
        if (new_selected) setSelected(new_selected);
        else if (!isLastPage) setNewPagination(current + 1, 0);
        return;
      }

      // 下一页
      if (e.key === 'ArrowRight' && !isLastPage) {
        return setNewPagination(current + 1, 0);
      }

      // 上一页
      if (e.key === 'ArrowLeft' && !isFirstPage) {
        return setNewPagination(current - 1, 19);
      }
    };

    document.addEventListener('keyup', handler, false);
    return () => {
      document.removeEventListener('keyup', handler);
    };
  }, [pagination, selected, data]);

  return (
    <main className={styles.main}>
      <Table
        bordered
        style={{ width: 500 }}
        size="small"
        dataSource={data}
        pagination={{
          size: 'default',
          total: pagination.total,
          current: pagination.current,
          pageSize: pagination.pagesize,
          showSizeChanger: false,
          showTotal: (total) => `共 ${total} 条`,
          onChange: (page: number) => fetchData(page),
        }}
        rowKey="date"
        rowSelection={{
          type: 'radio',
          hideSelectAll: true,
          selectedRowKeys: [selected?.date],
          onChange: (_, selectedRows) => {
            setSelected(selectedRows[0]);
          },
        }}
        columns={[
          {
            title: '和值',
            dataIndex: 'result',
            key: 'result',
            width: 60,
            render: (value) => {
              const [a, b, c] = value
                .split(/\s/g)
                .map((val: string) => Number(val));
              return a + b + c;
            },
            align: 'right',
          },
          // { title: '众数', key: 'mode', dataIndex: 'mode' },
          {
            title: '开奖日期',
            dataIndex: 'date',
            key: 'date',
            width: 100,
            align: 'right',
          },
          {
            width: 80,
            title: '开奖号码',
            dataIndex: 'result',
            key: 'result',
            align: 'right',
          },
          // { title: '中位数', key: 'median', dataIndex: 'median' },
          // { title: '均值', key: 'average', dataIndex: 'average' },
          // { title: '标准差', key: 'std', dataIndex: 'std' },
          // { title: '最小值', key: 'min', dataIndex: 'min' },
          // { title: '最大值', key: 'max', dataIndex: 'max' },
        ]}
      />
      <Charts selected={selected} />
    </main>
  );
}
