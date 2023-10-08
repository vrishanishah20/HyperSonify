import { Opacity } from "@mui/icons-material";
import Image, { StaticImageData } from "next/image";
import { HTMLProps } from "react";

const ImageTile = ({
  image,
  isSelected,
  onClick,
}: HTMLProps<HTMLButtonElement> & {
  image: string | StaticImageData;
  isSelected: boolean;
}) => {
  return (
    <button
      className={`group rounded-lg overflow-hidden border border-transparent border-gray-800 hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 transition ${
        isSelected
          ? "border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30 opacity-100"
          : ""
      }`}
      rel="noopener noreferrer"
      onClick={onClick}
    >
      <Image
        src={image}
        alt="Sample Image 1"
        className={`w-full object-cover max-h-[100px] transition ${
          isSelected ? "opacity-100" : "opacity-60"
        } `}
      />
    </button>
  );
};

export default ImageTile;
