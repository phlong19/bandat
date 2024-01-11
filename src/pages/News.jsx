import { news } from "../data/news";

function News() {
  return (
    <div className=" display flex m-auto">
      <div className=" display block m-auto p-[20px] ">
        {news.map((item) => (
          <div className="display flex h-[150px] max-w-[800px] bg-white ">
            <img src={item.img} className="" />
            <div className="p-[10px]">
              <i>{item.date}</i>
              <h1>{item.title}</h1>
              <p>{item.summary}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="display block">
        <p>hi</p>
      </div>
    </div>
  );
}

export default News;
