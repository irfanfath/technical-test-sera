/* eslint-disable @next/next/no-page-custom-font */
import { Fragment, FC, useEffect, useState } from "react";
import Cookies from "js-cookie";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Modal } from "components/elements";
import IconApi from "public/svg/icon-dashboard-api.svg";
import IconLog from "public/svg/icon-dashboard-log.svg";
import IconDocument from "public/svg/icon-dashboard-document.svg";
import IconLogout from "public/svg/icon-dashboard-logout.svg";
import IconProfile from "public/svg/icon-dashboard-profile.svg";

interface ISiteDashboard {
  title: string;
}

const SiteDashboard: FC<ISiteDashboard> = ({
  title = "Dashboard",
  children,
}) => {
  const { pathname } = useRouter();
  const [isShow, setShow] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(Cookies.get("username") || "");
  }, []);

  const showModalLogout = (e: any) => {
    e.preventDefault();
    setShow(true);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("username");
    Cookies.remove("expires_in");
    Cookies.remove("refresh_expires_in");
    Cookies.remove("refresh_token");
    setShow(false);
    window.location.href = "/";
  };

  return (
    <Fragment>
      <Head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>{title}</title>
        <link rel='icon' href='/favicon-picaso.png' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap'
          rel='stylesheet'
        />
        <meta name='robots' content='noindex'></meta>
        <meta name='googlebot' content='noindex'></meta>
      </Head>
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TCHV4ZH" height="0" width="0" style="display: none; visibility: hidden;" />`,
        }}
      />
      <div className='dashboard'>
        <aside className='dashboard__aside' data-cy='dashboard-aside'>
          <Link href='/'>
            <a>
              <Image
                src='/logo-picaso.png'
                title='Picaso'
                alt='Picaso team logo'
                width='174'
                height='41'
              />
            </a>
          </Link>
          <ul className='dashboard__aside-menu'>
            <li>
              <Link href='/dashboard/developer-logs'>
                <a
                  className={
                    pathname === "/dashboard/developer-logs" ? "active" : ""
                  }
                >
                  <IconLog />
                  List Article
                </a>
              </Link>
            </li>
            <li>
              <button className='dashboard__logout' onClick={showModalLogout}>
                <IconLogout />
                Logout
              </button>
            </li>
          </ul>
        </aside>
        <nav className='dashboard__nav'>
          <div className='dashboard__nav-profile'>
            <IconProfile />
            {username}
          </div>
        </nav>
        <main className='dashboard__main'>{children}</main>
      </div>
      <Modal show={isShow}>
        <div className='text-center' data-cy='demo-modal-error'>
          <h1 className='modal__title'>Logout</h1>
          <p>Do you really want to Logout?</p>
          <div className='modal__button'>
            <div className='row'>
              <div className='col'>
                <button
                  className='button button--white w-full'
                  onClick={() => setShow(false)}
                >
                  Cancel
                </button>
              </div>
              <div className='col'>
                <button className='button w-full' onClick={handleLogout}>
                  Exit
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default SiteDashboard;
