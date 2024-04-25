import { PiFrameCornersLight } from "react-icons/pi";
import { useMapView } from "../../context/MapViewContext";
import { TbBed, TbStack2 } from "react-icons/tb";
import { LiaBathSolid } from "react-icons/lia";
import ItemTagInformation from "./ItemTagInformation";
import { m2 } from "../../constants/anyVariables";

function InformationStack({ isLaptop, isPopup, data, area }) {
  const { mapView } = useMapView();
  const { bed_room, bath_room, floor } = data;

  return (
    <>
      {(!mapView || isPopup || !isLaptop) && (
        <div className="my-1 flex gap-2.5">
          <ItemTagInformation value={area + m2} icon={PiFrameCornersLight} />
          {bed_room > 0 && <ItemTagInformation value={bed_room} icon={TbBed} />}
          {bath_room > 0 && (
            <ItemTagInformation value={bath_room} icon={LiaBathSolid} />
          )}
          {floor > 0 && <ItemTagInformation value={floor} icon={TbStack2} />}
        </div>
      )}
    </>
  );
}

export default InformationStack;
