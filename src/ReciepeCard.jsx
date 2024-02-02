import React from "react";
import { FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  const { id, name, image, prepareTime, nutrients, tags, description } = recipe;
  const cardStyle = {
    backgroundImage: `url(${image})`,
  };
  return (
    <div
      className={`  flex flex-col items-center justify-between  w-full min-h-72 h-full rounded-md shadow-md bg-cover relative `}
      style={cardStyle}
    >
      <div className="headerContainer ">
        <p className=" font-semibold  text-center">{name}</p>
        <div className="flex items-center gap-2 justify-center">
          <FaClock className="text-[#8e6003]" />
          <p className="font-medium text-gray-800 ">{prepareTime} mins</p>
        </div>
      </div>
      <div className="flex max-w-full  flex-wrap items-center justify-center  gap-1 p-1">
        {tags.slice(0, 4).map((tag) => (
          <p className="bg-[#ffab03d1] p-2 rounded-md text-sm font-medium">
            {tag}
          </p>
        ))}
      </div>
      <p className="text-lg font-normal px-2 pb-1">
        {description
          .split(/\.\s|\.\.\.\s|\!|\?\s/)
          .slice(0, 2)
          .join("")}
      </p>
      <div className="flex max-w-full  flex-wrap items-center justify-center  gap-1 ">
        {Object.entries(nutrients)
          .slice(0, 3)
          .map(([key, value]) => (
            <p className="bg-[#ffab037d] p-2 rounded-md  text-sm font-medium">
              {key} : {value}
            </p>
          ))}
      </div>

      <Link
        className="bg-[#e9c46a] hover:bg-[#dda15e] duration-200 rounded-md p-2 m-1 font-semibold"
        to={`/recipe/${id}`}
      >
        Get all details
      </Link>
    </div>
  );
};

export default RecipeCard;
