import { news } from "../data/news";

function News() {
  return (
    <div className=" display flex m-auto bg-white">
      <div className=" display block m-auto p-[20px] bg-white ">
        {news.map((item) => (
          <div className="p-[10px] display flex h-[150px] max-w-[800px] bg-white ">
            <img src={item.img} className="" />
            <div className="pl-[10px]">
              <i>{item.date}</i>
              <h1 className="text-xl">{item.title}</h1>
              <p>{item.summary}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="display block">
        <p></p>
      </div>
    </div>
  );
}

export default News;
