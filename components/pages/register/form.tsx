import { FC, useState } from "react";
import Link from "next/link";
import { authRegister } from "api/auth";
import { isEmailValid } from "utils";
import { Modal } from "components/elements";
import IconSandbox from "public/svg/icon-sandbox-white.svg";
import IconEyeOff from "public/svg/icon-eye-off.svg";

interface IRegister {
  email: string;
  username: string;
  password: string;
  retype_password: string;
}

const initNotif = {
  isShow: false,
  type: "",
  message: "",
};

const RegisterForm: FC = () => {
  const [register, setRegister] = useState<IRegister>({
    email: "",
    username: "",
    password: "",
    retype_password: "",
  });

  const [agree, setAgree] = useState(false);
  const [showPassOne, setShowPassOne] = useState(false);
  const [showPassTwo, setShowPassTwo] = useState(false);
  const [notif, setNotif] = useState(initNotif);
  const [isSubmitted, setSubmitted] = useState(false);
  const isPassSame = register.password === register.retype_password;
  const isEmailNotValid =
    register.email.length > 0 && !isEmailValid(register.email);
  const isUsernameNotValid =
    register.username.length > 0 && register.username.length < 5;
  const isPasswordNotValid =
    register.password.length > 0 && register.password.length < 8;
  const isFilled =
    !register.username ||
    !register.email ||
    !isPassSame ||
    !agree ||
    isEmailNotValid ||
    isUsernameNotValid ||
    isPasswordNotValid;

  const changeInput = (e: any) => {
    e.preventDefault();
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitted(true);
    const payload = {
      email: register.email,
      username: register.username,
      password: register.password,
    };
    try {
      await authRegister(payload).then((res: any) => {
        setNotif({
          isShow: true,
          type: "success",
          message: res.data.message,
        });
        console.log(res)
      });
      setSubmitted(false);
    } catch (err:any) {
      setNotif({
        isShow: true,
        type: "error",
        message: err.response
          ? err.response.data.message
          : "Cannot register, please try again later.",
      });
      setSubmitted(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='form auth-form'>
      <h3 className='auth-form__title'>
        Register Account
      </h3>

      <label htmlFor='email'>
        <span>E-mail</span>
        <input
          type='email'
          name='email'
          className='input'
          id='email'
          data-cy='register-email'
          placeholder='johndoe@gmail.com'
          value={register.email}
          onChange={changeInput}
          required
        />
        {isEmailNotValid && (
          <span
            className='input-notif input-notif--error'
            data-cy='register-email-error'
          >
            Email is not valid
          </span>
        )}
      </label>

      <label htmlFor='username'>
        <span>Username</span>
        <input
          type='text'
          name='username'
          className='input'
          id='username'
          data-cy='register-username'
          placeholder='username'
          value={register.username}
          onChange={changeInput}
          required
        />
        {isUsernameNotValid && (
          <span
            className='input-notif input-notif--error'
            data-cy='register-username-error'
          >
            Username not valid
          </span>
        )}
      </label>

      <label htmlFor='password'>
        <span>Password</span>
        <div className='input-group'>
          <button
            type='button'
            className='input-group__right'
            data-cy='register-show-password'
            onClick={() => setShowPassOne(!showPassOne)}
          >
            <IconEyeOff />
          </button>
          <input
            type={showPassOne ? "text" : "password"}
            name='password'
            className='input'
            id='password'
            data-cy='register-password'
            placeholder='Password'
            value={register.password}
            onChange={changeInput}
            required
          />
        </div>
        {isPasswordNotValid && (
          <span
            className='input-notif input-notif--error'
            data-cy='register-password-error'
          >
            Password length must be min. 8 characters
          </span>
        )}
      </label>

      <label htmlFor='retype_password'>
        <span>Re-Type Password</span>
        <div className='input-group'>
          <button
            type='button'
            className='input-group__right'
            data-cy='register-show-retype_password'
            onClick={() => setShowPassTwo(!showPassTwo)}
          >
            <IconEyeOff />
          </button>
          <input
            type={showPassTwo ? "text" : "password"}
            name='retype_password'
            className='input'
            id='retype_password'
            data-cy='register-retype_password'
            placeholder='Password'
            value={register.retype_password}
            onChange={changeInput}
            required
          />
        </div>
        {register.retype_password.length > 0 && !isPassSame ? (
          <span
            className='input-notif input-notif--error'
            data-cy='register-retype_password-error'
          >
            Password not match
          </span>
        ) : (
          ""
        )}
      </label>

      <label htmlFor='agree'>
        <input
          type='checkbox'
          name='agree'
          data-cy='register-agree'
          id='agree'
          defaultChecked={agree}
          onClick={() => setAgree(!agree)}
          required
        />
        &nbsp; I have read and agree to &nbsp;
          <a className='text-red' data-cy='link-terms'>
            <b>the Terms</b>
          </a>
      </label>

      <button
        type='submit'
        className='button w-full'
        data-cy='register-submit'
        disabled={isFilled || isSubmitted}
      >
        <IconSandbox /> &nbsp; {isSubmitted ? "Loading..." : "REGISTER"}
      </button>

      <div className='auth-form__link text-center'>
        <Link href='/login'>
          <a className='text-red' data-cy='link-login'>
            <b>
              <u>Login to your account</u>
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
      ) : (
        <Modal show={notif.isShow}>
          <div className='text-center'>
            <h1 className='modal__title'>Sucessfully Registered!</h1>
            <p>{notif.message}</p>
            <div className='modal__button text-center'>
              <Link href='/login' data-cy='modal-link-login'>
                <a className='button w-full'>
                  <b>Go to Login</b>
                </a>
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </form>
  );
};

export default RegisterForm;
