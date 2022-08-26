import type { NextPage } from "next";
import Image from "next/image";
import Site from "components/layouts/site";
import RegisterForm from "components/pages/register/form";

const Register: NextPage = () => {
  const seo = {
    title: "Register Account",
    description:
      "Register new account",
    noIndex: false,
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
              <h2 className='auth-title'>Let's Create New Account</h2>
              <p className='auth-description'>
                If you have account you can going to login page
              </p>
            </div>
            <div className='col-1 md-col-12'></div>
            <div className='col-5 md-col-8 sm-col-12'>
              <div className='card'>
                <RegisterForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Site>
  );
};

export default Register;
