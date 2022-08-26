import type { NextPage } from "next";
import Image from "next/image";
import Site from "components/layouts/site";
import LoginForm from "components/pages/login/form";

const Login: NextPage = () => {
  const seo = {
    title: "Masuk/Login",
  };

  return (
    <Site seo={seo}>
      <section className='page'>
        <div className='container'>
          <div className='row row--center row--middle'>
            <div className='col-6 md-hide text-center'>
              <Image
                src='/ilust-vr.png'
                alt='Logo'
                width='400'
                height='345'
              />
              <h2 className='auth-title'>Please Login</h2>
              <p className='auth-description'>
                If you haven't account you can going to register page
              </p>
            </div>
            <div className='col-1 md-col-12'></div>
            <div className='col-5 md-col-8 sm-col-12'>
              <div className='card'>
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Site>
  );
};

export default Login;
