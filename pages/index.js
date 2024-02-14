import config from "@config/config.json";
import Base from "@layouts/Baseof";
import Cta from "@layouts/components/Cta";
import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import { getListPage } from "../lib/contentParser";
import { otherFaqs } from "../content/otherData";

const Home = ({ frontmatter, faq }) => {
  const { banner, feature, services, workflow, call_to_action } = frontmatter;
  const { title } = config.site;

  console.log('faqs next',faq.faqsnext)

  return (
    <Base title={title}>
      {/* Banner */}
      <section className="section pb-[50px]">
        <div className="container">
          <div className="row text-center">
            <div className="mx-auto lg:col-10">
              <h4>АВТОНОМНАЯ НЕКОММЕРЧЕСКАЯ ОРГАНИЗАЦИЯ</h4>
              <h1 className="font-primary font-bold">Иновационый Центр Экспертиз</h1>
              {banner.button.enable && (
                <Link
                  className="btn btn-primary mt-4"
                  href={banner.button.link}
                  rel={banner.button.rel}
                >
                  {banner.button.label}
                </Link>
              )}
              <Image
                className="mx-auto mt-12"
                src={banner.image}
                width={750}
                height={390}
                alt="banner image"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section bg-theme-light">
        <div className="container">
          <div className="text-center">
            <h2>Преимущества</h2>
          </div>
          <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-2">
            {feature.features.map((item, i) => (
              <div
                className="feature-card rounded-xl bg-white p-5 pb-8 text-center"
                key={`feature-${i}`}
              >
                {item.icon && (
                  <Image
                    className="mx-auto"
                    src={item.icon}
                    width={200}
                    height={200}
                    alt=""
                  />
                )}
                <div className="mt-4">
                  {markdownify(item.name, "h3", "h5")}
                  <p className="mt-3 text-xl">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* services */}
      {services.map((service, index) => {
        const isOdd = index % 2 > 0;
        return (
          <section
            key={`service-${index}`}
            className={`section ${isOdd && "bg-theme-light"}`}
          >
            <div className="container">
              <div className="items-center gap-8 md:grid md:grid-cols-2">
                {/* Carousel */}
                <div className={`service-carousel ${!isOdd && "md:order-2"}`}>
                  <Swiper
                    modules={[Autoplay, Pagination]}
                    pagination={
                      service.images.length > 1 ? { clickable: true } : false
                    }
                    autoplay={{
                      delay: 5000,
                      disableOnInteraction: false,
                    }}
                    init={service?.images > 1 ? false : true}
                  >
                    {/* Slides */}
                    {service?.images.map((slide, index) => (
                      <SwiperSlide key={index}>
                        <Image src={slide} alt="" width={600} height={500} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                {/* Content */}
                <div
                  className={`service-content mt-5 md:mt-0 ${
                    !isOdd && "md:order-1"
                  }`}
                >
                  <h2 className="font-bold leading-[40px]">{service?.title}</h2>
                  <p className="mt-4 mb-2 text-xl">{service?.content}</p>
                  {service.button.enable && (
                    <Link
                      href={service?.button.link}
                      className="cta-link inline-flex items-center text-primary"
                    >
                      {service?.button.label}
                      <Image
                        className="ml-1"
                        src="/images/arrow-right.svg"
                        width={18}
                        height={14}
                        alt="arrow"
                      />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section className="section">
        <div className="container">
          {markdownify(faq.title, "h1", "text-center font-normal")}
          <div className="section row  -mt-6">
            {faq.faqs.map((faq, index) => (
              <div key={index} className="col-12 mt-6 md:col-6">
                <div className="p-12  shadow">
                  <div className="faq-head relative">
                    {markdownify(faq.title, "h4")}
                  </div>
                  {markdownify(faq.answer, "p", "faq-body mt-4 text-xl")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section bg-theme-primary">
        <div className="container">
          {markdownify('Ключевые характеристики экспертов-строителей центра', "h1", "text-center font-normal")}
          <div className="section row  -mt-6">
            {otherFaqs.map((faq, index) => (
              <div key={index} className="col-12 mt-6 md:col-6">
                <div className="p-12  shadow">
                  <div className="faq-head relative">
                    {markdownify(faq.title, "h4")}
                  </div>
                  {markdownify(faq.ans, "p", "faq-body mt-4 text-xl")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section pb-0">
        <div className="container">
          <h1 className="text-center font-normal">Ключевые характеристики экспертов-строителей центра</h1>
          <div className="section row -mt-10 justify-center md:mt-0">
            {otherFaqs.map((plan, index) => (
              <div
                className={"col-12 md:col-4"}
                key={plan.title}
              >
                <div className="card text-center">
                  {/*<h4>{plan.ans}</h4>*/}
                  {markdownify(plan.ans, "p", "faq-body mt-4 text-xl")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Base>
  );
};

export const getStaticProps = async () => {
  const homePage = await getListPage("content/_index.md");
  const faqPage = await getListPage("content/faq.md");
  const { frontmatter } = homePage;
  const { frontmatter: faq } = faqPage;
  console.log('faqPage',faq)
  return {
    props: {
      frontmatter,
      faq
    },
  };
};

export default Home;
