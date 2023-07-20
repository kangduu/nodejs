import styles from './styles.less';
import { useEffect, useState } from 'react';
import { getDataList } from './request';
import { Table } from 'antd';

const PageSize = 100;

export default function IndexPage() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pagesize: PageSize,
    total: 0,
  });

  const fetchData = (page?: number) =>
    getDataList({
      page: page || pagination.current,
      pagesize: pagination.pagesize,
    })
      .then((res: any) => {
        setData(res?.data || []);
        setPagination(
          res?.pagination || { current: 1, pagesize: PageSize, total: 0 },
        );
      })
      .catch(() => {
        setData([]);
        setPagination({ current: 1, pagesize: PageSize, total: 0 });
      });

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className={styles.main}>
      <Table
        bordered
        scroll={{
          scrollToFirstRowOnChange: true,
          x: 'max-content',
          y: 800,
        }}
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
        columns={[
          { title: '开奖日期', dataIndex: 'date', key: 'date', width: 100 },
          { title: '开奖号码', dataIndex: 'result', key: 'result', width: 100 },
          { title: '和值', dataIndex: 'sum', key: 'sum', width: 100 },
          { title: '众数', key: 'mode', dataIndex: 'mode' },
          { title: '中位数', key: 'median', dataIndex: 'median' },
          { title: '均值', key: 'average', dataIndex: 'average' },
          { title: '标准差', key: 'std', dataIndex: 'std' },
          { title: '最小值', key: 'min', dataIndex: 'min' },
          { title: '最大值', key: 'max', dataIndex: 'max' },
        ]}
      />
    </main>
  );
}
