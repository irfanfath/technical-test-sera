/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, FC, useState, useEffect } from "react";
import { useRouter } from "next/router";
import {getListApiDeveloperLog } from "api/dashboard";
import Pagination from "@etchteam/next-pagination";
import { data } from "cypress/types/jquery";
import Link from "next/link";

interface IResult {
  id: string;
  attributes: {
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  };
}

// interface IDataLog {
//   message: string;
//   result: IResult[];
//   success: boolean;
//   total_page: number;
// }

// const initDataLog = {
//   message: "",
//   result: [],
//   success: false,
//   total_page: 0,
// };

const initFilter: any = {
  date: "",
  api: "",
  type: "",
  page: 1,
  size: 20,
};

const DashboardDeveloperLog: FC = () => {
  const router = useRouter();
  const query = router.query;

  // const [dataLog, setDataLog] = useState<IDataLog>(initDataLog);
  const [listApi, setListApi] = useState([]);
  const [filter, setFilter] = useState(initFilter);
  const [totalPage, setTotalPage] = useState<any>(0);

  const handleGetListApiDeveloperLog = async () => {
    await getListApiDeveloperLog()
      .then((res) => {
        // console.log(res.data.data)
        setListApi(res.data.data);
      })
      .catch((err) => {
        console.log("getListApiDeveloperLog", err);
      });
  };

  useEffect(() => {
    handleGetListApiDeveloperLog();
    console.log(listApi)
  }, []);

  useEffect(() => {
    setFilter({
      date: query.date || "",
      api: query.api || "",
      type: query.type || "",
      page: query.page || 1,
      size: query.size || 20,
    });
  }, [query.page]);

  return (
    <Fragment>
      <h2>Article</h2>
      <button><Link href='/dashboard/create-article'>Create Article</Link></button>
      <div className='dashboard__frame' data-cy='dashboard-developer-logs'>
        <div className='dashboard__card'>
          <div
            className='dashboard__table'
            data-cy='dashboard-developer-logs-tabble'
          >
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Content</th>
                  <th>Create At</th>
                  <th>Updated At</th>
                </tr>
              </thead>
              <tbody>
                {listApi &&
                  listApi.map((data: IResult, index: any) => (
                    <tr key={index}>
                      <td>{data.attributes.title}</td>
                      <td>{data.attributes.content}</td>
                      <td>{data.attributes.createdAt}</td>
                      <td>{data.attributes.updatedAt}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ul className='dashboard__pagination'>
        {/* <span>
          Showing{" "}
          <strong>
            {dataLog.result.length ? query.size : 0} from{" "}
            {dataLog.result.length
              ? dataLog.result.length * dataLog.total_page
              : 0}{" "}
            data
          </strong>
        </span> */}
      </ul>
      <Pagination total={filter.size * totalPage} />
    </Fragment>
    // <div>tes</div>
  );
};

export default DashboardDeveloperLog;
