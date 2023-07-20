type GetDataListPayload = {
  page: number;
  pagesize: number;
  year?: string;
};

export function getDataList(payload: GetDataListPayload) {
  return new Promise((resolve, reject) => {
    fetch('/api/permutation/3/list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        const response = res.json();
        return response;
      })
      .then(({ code, data, pagination }: any) => {
        if (code === 200) resolve({ data, pagination });
        else resolve(null);
      })
      .catch(() => {
        reject(null);
      });
  });
}
