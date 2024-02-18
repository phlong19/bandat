import { useAuth } from "../context/UserContext";

function Details() {
  const {data,level,isLoading}=useAuth();

  if(isLoading){
    return <div></div>
  }

  return (
    <div className="flex min-h-full w-full items-center justify-center">
      single nha dat details
    </div>
  );
}

export default Details;
