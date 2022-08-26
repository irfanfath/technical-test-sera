import { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Modal } from "components/elements";
import IconSandbox from "public/svg/icon-sandbox-white.svg";
import { createArticle } from "api/dashboard";

interface IRegister {
  title: string;
  content: string;
}

const initNotif = {
  isShow: false,
  type: "",
  message: "",
};

const ArticleForm: FC = () => {
  const [register, setRegister] = useState<IRegister>({
    title: "",
    content: "",
  });

  const [notif, setNotif] = useState(initNotif);
  const [isSubmitted, setSubmitted] = useState(false);
  const isFilled =
    !register.content ||
    !register.title;

  const changeInput = (e: any) => {
    e.preventDefault();
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitted(true);
    const payload = {
      data: {
        title: register.title,
        content: register.content,
      }
    };
    try {
      await createArticle(payload).then((res: any) => {
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
        Create New Article&apos;s
      </h3>

      <label htmlFor='title'>
        <span>Title</span>
        <input
          type='title'
          name='title'
          className='input'
          id='title'
          data-cy='register-title'
          placeholder='title'
          value={register.title}
          onChange={changeInput}
          required
        />
      </label>

      <label htmlFor='content'>
        <span>Content</span>
        <input
          type='text'
          name='content'
          className='input'
          id='content'
          data-cy='register-content'
          placeholder='content'
          value={register.content}
          onChange={changeInput}
          required
        />
      </label>

      <button
        type='submit'
        className='button w-full'
        data-cy='register-submit'
        disabled={isFilled || isSubmitted}
      >
        <IconSandbox /> &nbsp; {isSubmitted ? "Loading..." : "Create Article"}
      </button>

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
            <h1 className='modal__title'>Sucessfully Create Article!</h1>
            <p>{notif.message}</p>
            <div className='modal__button text-center'>
              <Link href='/dashboard/developer-logs' data-cy='modal-link-login'>
                <a className='button w-full'>
                  <b>Go to Dashboard</b>
                </a>
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </form>
  );
};

export default ArticleForm;
