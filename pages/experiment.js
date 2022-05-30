import AllData from "../lib/experiment";

export default function experiment({ data }) {
  return (
    <>
      I am the experiment (md file's data)
      <div>
        {data?.map((val, index) => {
          return (
            <div>
              <div>
                <b>{val?.title}</b>
              </div>
              <div>{val?.date}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export function getStaticProps() {
  return {
    props: {
      data: AllData(),
    },
  };
}
