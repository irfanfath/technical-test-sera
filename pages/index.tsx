import type { NextPage, GetServerSideProps } from "next";
import DeveloperLog from "./dashboard/developer-logs";
import Login from "./login";

interface ILogin {
  isLogin: boolean;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req, res } = ctx;
  const { cookies } = req;

  return {
    props: {
      isLogin: cookies.token ? true : false,
    },
  };
};

const Home: NextPage<ILogin> = ({ isLogin }) => {
  return (
    <>
      { !isLogin?
        <Login /> : <DeveloperLog />
      }
    </>
  );
};

export default Home;
