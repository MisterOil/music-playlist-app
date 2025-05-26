import type { Song } from "../types";

const Card = ({ artist, title }: Song) => {
  return (
    <div className="bg-gray-800 p-4 rounded-md hover:bg-gray-700 transition-colors cursor-pointer">
      <div className="aspect-square bg-gray-700 mb-4 rounded-md"></div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-400">{artist}</p>
    </div>
  );
};

export default Card;
