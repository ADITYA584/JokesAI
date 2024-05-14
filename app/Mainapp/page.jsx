"use client";
import axios from "axios";
import React, { useState } from "react";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

const JokeGenerator = () => {
  // const session = await getServerSession(options)
  // if (!session) {
  //         redirect("/api/auth/signin?callback=/Mainapp")
  // }
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callback=/Mainapp");
    },
  });
  // const [jokesarray, setjokesarray] = useState([]);
  const [storeapi, setstoreapi] = useState(
    localStorage.getItem("apikey") ? localStorage.getItem("apikey") : ""
  );
  const [joke, setJoke] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [topic, setTopic] = useState("");
  const [writing, setwriting] = useState(true);

  const InputChangeHandler = (e) => {
    setTopic(e.target.value);
  };
  const InputChangeHandlerAPI = (e) => {
    setstoreapi(e.target.value);
  };

  const fetchJoke = async () => {
    localStorage.setItem("apikey", storeapi);
    setwriting(false);
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          model: "text-davinci-003",
          prompt: `Tell me a joke on ${topic} .`,
          max_tokens: 50,
          temperature: 0.7,
          n: 1,
          stop: ["\n"],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storeapi}`, // Replace with your OpenAI API key
          },
        }
      );
      setJoke(response.data.choices[0].text.trim());
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    setTopic("");
    // const temp = { api: { storeapi } }
  };

  return (
    <div className="flex flex-col h-[90vh] justify-center items-center">
      <div className="flex flex-col gap-8">
        <h1 className="text-3xl font-bold ">Input your Topic Here </h1>
        {writing && (
          <input
            onChange={(e) => {
              InputChangeHandlerAPI(e);
            }}
            className="p-3 border-2 rounded-lg text-lg hover:outline-blue-500"
            type="text"
            placeholder="Enter Your OPENAI_API_KEY"
          ></input>
        )}

        <input
          value={topic}
          onChange={(e) => InputChangeHandler(e)}
          className="p-3 border-2 rounded-lg text-lg hover:outline-blue-500"
          type="text"
          placeholder="Joke About"
        ></input>
        <button
          className="border-none p-2 font-semibold text-lg rounded-lg bg-green-500 text-white "
          onClick={fetchJoke}
          disabled={loading}
        >
          {loading ? "Loading" : "Get Joke"}{" "}
        </button>
        {error && <p>error</p>}

        <div className="text-2xl rounded-lg font-semibole mt-10 px-4 py-2 w-full overflow-hidden">
          {joke && <p>{joke}</p>}
        </div>
      </div>
    </div>
  );
};

export default JokeGenerator;
