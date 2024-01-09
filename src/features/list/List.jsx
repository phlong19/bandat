import { useData } from "./useData";

function List() {
  const { data, error, isLoading } = useData();
  if (isLoading) return <h1>dang load, doi ty</h1>;
  // console.log(data); // log to see
  return (
    <div>
      {data.map((city, index) => (
        <h2 key={index}>{city.cityName}</h2>
      ))}
    </div>
  );
}

export default List;
