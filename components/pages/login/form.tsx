import { FC, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { authLogin } from "api/auth";
import { Modal } from "components/elements";
import IconSandbox from "public/svg/icon-sandbox-white.svg";
import IconEyeOff from "public/svg/icon-eye-off.svg";

interface ILogin {
  identifier: string;
  password: string;
}

const initNotif = {
  isShow: false,
  type: "",
  message: "",
};

const LoginForm: FC = () => {
  const [login, setLogin] = useState<ILogin>({ identifier: "", password: "" });
  const [notif, setNotif] = useState(initNotif);
  const [isSubmitted, setSubmitted] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const isFilled = !login.identifier || !login.password;
  const now = new Date().getTime();

  const changeInput = (e: any) => {
    e.preventDefault();
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      await authLogin(login).then((res) => {
        if (res.status === 200) {
          Cookies.set("token", res.data.jwt);
          window.location.href = "/dashboard/developer-logs";
        } else {
          setNotif({
            isShow: true,
            type: "error",
            message: "Username/Password Salah",
          });
          setSubmitted(false);
        }
      });
    } catch (err:any) {
      setNotif({
        isShow: true,
        type: "error",
        message: err.response
          ? err.response.data.message
          : "Cannot login, please try again later.",
      });
      setSubmitted(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='form auth-form'>
      <h3 className='auth-form__title'>Login to Dashboard</h3>

      <label htmlFor='identifier'>
        <span>Username</span>
        <input
          type='text'
          name='identifier'
          className='input'
          data-cy='login-identifier'
          id='identifier'
          placeholder='identifier'
          value={login.identifier}
          onChange={changeInput}
          required
        />
      </label>

      <label htmlFor='password'>
        <span>Password</span>
        <div className='input-group'>
          <button
            type='button'
            className='input-group__right'
            data-cy='login-show-password'
            onClick={() => setShowPass(!showPass)}
          >
            <IconEyeOff />
          </button>
          <input
            type={showPass ? "text" : "password"}
            name='password'
            className='input'
            data-cy='login-password'
            id='password'
            placeholder='Password'
            value={login.password}
            onChange={changeInput}
            required
          />
        </div>
      </label>

      <Link href='/forgot-password'>
        <a className='text-red' data-cy='link-forgot-password'>
          Forgot Password?
        </a>
      </Link>

      <button
        type='submit'
        className='button w-full'
        data-cy='login-submit'
        disabled={isFilled || isSubmitted}
      >
        <IconSandbox /> &nbsp; {isSubmitted ? "Loading..." : "LOGIN"}
      </button>

      <div className='auth-form__link text-center'>
        <Link href='/register'>
          <a className='text-red' data-cy='link-register'>
            <b>
              <u>Register account</u>
            </b>
          </a>
        </Link>
      </div>

      {notif.type === "error" ? (
        <Modal show={notif.isShow}>
          <div className='text-center'>
            <h1 className='modal__title'>Invalid</h1>
            <p>{notif.message}</p>
            <div className='modal__button'>
              <button
                className='button w-full'
                data-cy='modal-close'
                onClick={() => setNotif(initNotif)}
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
    </form>
  );
};

export default LoginForm;
