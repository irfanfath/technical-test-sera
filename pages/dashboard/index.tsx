import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import SiteDashboard from 'components/layouts/site-dashboard';
import DashboardSummary from 'components/pages/dashboard/summary';

interface IAuth {
  token: string;
  login_time: string;
  expires_in: string;
  refresh_expires_in: string;
  refresh_token: string;
}

interface IDashboard {
  auth: IAuth;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req, res } = ctx;
  const { cookies } = req;

  return {
    props: {
      auth: {
        token: cookies.token || '',
        login_time: cookies.login_time || '0',
        expires_in: cookies.expires_in || '',
        refresh_expires_in: cookies.refresh_expires_in || '',
        refresh_token: cookies.refresh_token || '',
      },
    },
  };
};

const Dashboard: NextPage<IDashboard> = ({ auth }) => {
  return (
    <SiteDashboard title="Dashboard">
      <DashboardSummary auth={auth} />
    </SiteDashboard>
  );
};

export default Dashboard;
