import { IoImagesOutline } from "react-icons/io5";

function ItemImages({ images }) {
  return (
    <div className="items-center md:flex md:gap-2">
      <img
        src={images[0].mediaLink}
        alt="main img"
        className="aspect-video w-full rounded-t object-cover md:w-1/2"
      />
      <div className="flex items-center justify-center gap-[2px] last:col-span-2 md:float-right first:md:w-1/2">
        {images.slice(1, 4).map((item, i) => (
          <img
            key={i}
            src={item.mediaLink}
            alt="child img"
            className="mt-[2px] aspect-[4/3] w-1/3 rounded-b object-cover md:h-full"
          />
        ))}
      </div>
      <div className="absolute bottom-0 right-0 flex h-10 w-full items-end justify-end gap-2 bg-[linear-gradient(180deg,rgba(44,44,44,0)_0%,rgba(44,44,44,0.8)_100%)] font-semibold text-white md:h-14 md:pb-2.5">
        <span className="text-2xl">
          <IoImagesOutline />
        </span>
        <span className="mr-3 text-base">{images.length - 4}</span>
      </div>
    </div>
  );
}

export default ItemImages;
