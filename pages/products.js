import axios from "axios";
import { useRouter } from "next/router";
import React from "react";

const Product = ({ products, mdData }) => {
  const router = useRouter();
  const redirectFunction = (productID) => {
    router.push(`/products/${productID}`);
  };
  return (
    <div>
      <div>Products are here</div>
      <div className="product-dashboard">
        {products?.map((product, index) => {
          return (
            <div
              className="product-card"
              onClick={() => redirectFunction(product?.id)}
              key={index}
            >
              <div>
                <img src={product?.image} width={200} height={200} />
              </div>
              <div>{product?.title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export async function getStaticProps() {
  let response = {};
  try {
    response = await axios.get(`${process.env.NEXT_API_URL}/products`, {
      headers: {
        Authorization: process.env.NEXT_TOKEN,
      },
      data: {},
    });
  } catch (e) {
    if (e) {
      response = {};
    }
  }
  return {
    props: {
      products: response?.data?.result,
    },
  };
}
export default Product;
