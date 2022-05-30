import { Carousel, Spin } from "antd";
import axios from "axios";
import { useRouter } from "next/router";

export default ({ product }) => {
  const router = useRouter();
  return (
    <>
      {!product?.variants?.length ? (
        <Spin />
      ) : (
        <div>
          <b>{product?.product?.title}</b>
          <div style={{ width: 700, height: 500 }}>
            <Carousel>
              {product?.variants?.map((val, index) => {
                return (
                  <div key={index}>
                    <img src={val?.image} height={700} />
                  </div>
                );
              })}
            </Carousel>
          </div>
        </div>
      )}
    </>
  );
};
export async function getStaticPaths() {
  const response = await axios.get(`${process.env.NEXT_API_URL}/products`, {
    headers: {
      Authorization: "Bearer KcCQ9hfeNmBxkRqe2h3ABOj5Ybin02IikQne4XhM",
    },
    data: {},
  });

  const paths = response?.data?.result.map((product) => ({
    params: { slug: product.id.toString() },
  }));

  return { paths, fallback: false };
}
export async function getStaticProps({ params }) {
  let response = {};
  try {
    response = await axios.get(
      `${process.env.NEXT_API_URL}/products/${params.slug}`
    );
  } catch (e) {
    if (e) {
      response = {};
    }
  }
  return {
    props: {
      product: response?.data?.result || {},
    },
  };
}
