import type { NextPage } from "next";
import Image from "next/image";
import Site from "components/layouts/site";
import ArticleForm from "components/pages/dashboard/create-article/form";

const CreateArticle: NextPage = () => {
  const seo = {
    title: "Create Article",
    description:
      "Create new article",
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
              <h2 className='auth-title'>Create New Article</h2>
              <p className='auth-description'>
                Let's Create New Article
              </p>
            </div>
            <div className='col-1 md-col-12'></div>
            <div className='col-5 md-col-8 sm-col-12'>
              <div className='card'>
                <ArticleForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Site>
  );
};

export default CreateArticle;
