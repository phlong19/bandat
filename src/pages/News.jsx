import { news } from "../data/fakeNews";

function News() {
  return (
    <div className="flex h-screen max-w-[800px] items-center justify-center gap-3 bg-red-500 text-blue-700 dark:bg-yellow-600">
      {news.map((item) => (
        <div key={item.title} className="text-black">
          <h1>{item.title}</h1>
          <b>{item.date}</b>
          <p>{item.author}</p>
          <p>{item.summary}</p>
        </div>
      ))}
    </div>
  );
}

export default News;
