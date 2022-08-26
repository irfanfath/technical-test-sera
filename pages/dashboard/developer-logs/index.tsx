import type { NextPage } from 'next';
import SiteDashboard from 'components/layouts/site-dashboard';
import DashboardDeveloperLog from 'components/pages/dashboard/developer-logs';

const DeveloperLog: NextPage = () => {
  return (
    <SiteDashboard title="Developer Log">
      <DashboardDeveloperLog />
    </SiteDashboard>
  );
};

export default DeveloperLog;
