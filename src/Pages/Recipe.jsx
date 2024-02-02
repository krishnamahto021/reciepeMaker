import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Recipe = () => {
  const { rid } = useParams();
  const [loading, setLoading] = useState(false);
  const [reciepe, setReciepe] = useState("");
  const getRecipe = async () => {
    const options = {
      method: "GET",
      url: `https://low-carb-recipes.p.rapidapi.com/recipes/${rid}`,
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_X_RAPIDAPI_KEY,
        "X-RapidAPI-Host": import.meta.env.VITE_X_RAPIDAPI_HOST,
      },
    };

    try {
      setLoading(true);
      const res = await axios.request(options);
      if (res.status === 200) {
        setReciepe(res.data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
  };
  useEffect(() => {
    getRecipe();
  }, [rid]);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!reciepe) {
    return <p>No recipe found</p>;
  }
  const {
    name,
    image,
    cookTime,
    prepareTime,
    servings,
    ingredients,
    steps,
    nutrients,
    tags,
    description,
  } = reciepe;

  return (
    <div className="recipe-card bg-[#fefae0] rounded-lg overflow-hidden shadow-md p-2  ">
      <img src={image} alt={name} className="object-cover w-full " />

      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-2">{name}</h1>

        <div className="flex justify-between mb-4">
          <p>Cook Time: {cookTime} minutes</p>
          <p>Prep Time: {prepareTime} minutes</p>
          <p>Servings: {servings}</p>
        </div>

        <div className="mb-4">
          <p className="text-gray-700">{description}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Ingredients:</h2>
          <ul className="list-disc ml-6">
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient.name}</li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">
            Nutrients (per serving):
          </h2>
          <ul className="columns-1 sm:columns-2 md:columns-3 ">
            {Object.entries(nutrients).map(([key, value]) => (
              <li className="list-disc ml-6">
                {key} : {value}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Steps:</h2>
          <ol className="list-decimal ml-6">
            {steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Tags:</h2>
          <ul className="list-disc ml-6 columns-1 sm:columns-2 md:columns-3">
            {tags.map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
