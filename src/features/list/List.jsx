import toast from "react-hot-toast";
import Spinner from "../../ui/Spinner";
import ErrorFallBack from "../../ui/ErrorFallBack";
import { useListingPage } from "./useListingPage";
import { formatDate } from "../../utils/helper";

function List({ purType }) {
  const { data, error, isLoading } = useListingPage(purType);

  if (isLoading) {
    return (
      <div className="absolute flex h-full w-full items-center justify-center bg-light dark:bg-dark">
        <Spinner inButton={false} width={50} height={50} />
      </div>
    );
  }

  if (error) {
    toast.error(error.message);
    return <ErrorFallBack />;
  }

  console.log(data);
  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          Nhà này ở {item.address}, {item.dis.disName}, {item.city.cityName} có{" "}
          {item.bed_room} phòng ngủ và {item.bath_room} phòng đái ỉa. Bài viết
          lúc {formatDate(item.created_at, undefined, true)}
        </div>
      ))}
    </div>
  );
}

export default List;
