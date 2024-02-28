import { useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

import Map from "../ui/Map";
import { useMapView } from "../context/MapViewContext";

function Contacts() {
  const { mapView, setMapView } = useMapView();
  const listAnimationControl = useAnimation();
  const mapAnimationControl = useAnimation();

  // TODO: fix exit animation
  useEffect(() => {
    if (mapView) {
      // if true, animate the map sliding in and the list shrinking
      mapAnimationControl.start({
        x: "0%",
        width: "46%",
        opacity: 1,
        transition: { duration: 0.5 },
      });
      listAnimationControl.start({
        width: "80%",
        transition: { duration: 0.5 },
      });
    } else {
      // if false, animate the map sliding out and the list expanding
      Promise.all([
        mapAnimationControl.start({
          x: "100%",
          opacity: 0,
          transition: { duration: 0.5 },
        }),
        listAnimationControl.start({
          width: "100%",
          transition: { duration: 0.5 },
        }),
        mapAnimationControl.set({ width: 0 }),
      ]);
    }
  }, [mapView, mapAnimationControl, listAnimationControl]);

  return (
    <>
      <button onClick={() => setMapView((s) => !s)}>toggle map</button>
      <div className="flex h-screen">
        <AnimatePresence presenceAffectsLayout>
          <motion.div
            key="list"
            initial={{ width: "100%" }}
            animate={listAnimationControl}
            className={`z-10 flex h-full min-h-[90dvh] w-full items-center justify-center bg-red-300 ${
              mapView ? "overflow-y-auto" : ""
            }`}
          >
            content list
          </motion.div>

          <motion.div
            key="map"
            initial={{ x: "100%", opacity: 0, width: 0 }}
            animate={mapAnimationControl}
          >
            <Map data={[]} purType={true} />
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

export default Contacts;
