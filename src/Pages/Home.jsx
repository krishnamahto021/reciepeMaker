import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReciepeCard from "../ReciepeCard";

const Home = () => {
  const [query, setQuery] = useState("");
  const [reciepe, setReciepe] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const options = {
      method: "GET",
      url: "https://low-carb-recipes.p.rapidapi.com/search",
      params: {
        name: query,
      },
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
    setQuery("");
    setLoading(false);
  };
  return (
    <main className="bg-[url(https://img.freepik.com/free-vector/healthy-recipe-illustration-concept_23-2148561577.jpg?w=740&t=st=1706258028~exp=1706258628~hmac=b4c67d0f444fddcc7d0e1eb9a50aab852105336e2000d78fccbb89ebe37a0fda)]  bg-center flex flex-col gap-2 min-h-screen ">
      <section className="formContainer flex justify-around items-center backdrop-blur-sm mt-4">
        <form
          className="reciepeForm h-1/4 w-9/12  bg-gradient-to-r from-[#ba8c32] to-[#eadbbc] rounded-md p-2 shadow-sm shadow-[#e7bf71] "
          onSubmit={handleSubmit}
        >
          <h1 className="text-center font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-4">
            What do you want to cook today?
          </h1>
          <input
            className="block m-auto p-2 focus:outline-none rounded-md"
            placeholder="Let's cook healthy"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            required
          ></input>
          <button
            className="block m-auto mt-4 bg-[#ffab03] p-2 rounded-md text-xl font-medium hover:bg-[#8f6002] duration-200 hover:text-gray-950"
            type="submit"
          >
            Find Now
          </button>
        </form>
      </section>
      <div className=" reciepeCardContainer  grid grid-cols-1 sm:grid-cols-2   lg:grid-cols-4  gap-3 p-1 ">
        {loading && (
          <div role="status" className="block m-auto ">
            <svg
              aria-hidden="true"
              class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        )}
        {reciepe.map((r, index) => (
          <Link to={`/recipe/${r.id}`}>
            <ReciepeCard key={index} recipe={r} />
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Home;
