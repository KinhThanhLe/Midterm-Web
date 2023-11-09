import { Button, Card } from "@material-tailwind/react";
import FounderCard from "./FounderCard";

const founders = [
  {
    id: "20120472",
    name: "Hien Thai",
    image:
      "https://i.pinimg.com/564x/4e/26/42/4e264223c3ea2db92c47456f6438c77f.jpg",
    facebook: "dsfads",
    linkedin: "dsfads",
    github: "adsfsad",
  },
  {
    id: "20120373",
    name: "Thanh Le",
    image:
      "https://i.pinimg.com/564x/4e/26/42/4e264223c3ea2db92c47456f6438c77f.jpg",
    facebook: "dsfads",
    linkedin: "dsfads",
    github: "adsfsad",
  },
  {
    id: "20120468",
    name: "Hai Nguyen",
    image:
      "https://i.pinimg.com/564x/4e/26/42/4e264223c3ea2db92c47456f6438c77f.jpg",
    facebook: "dsfads",
    linkedin: "dsfads",
    github: "adsfsad",
  },
];

function LandingPage() {
  return (
      <div className="pb-10">
          <div className="h-[600px] bg-cover flex items-center justify-center" style={{backgroundImage: "url('/panel.png')"}}>
            <div className="w-9/12 flex justify-between">
              <div className="mt-20">
                <h1 className="font-extrabold text-gray-300 text-4xl">
                  MIDTERN PROJECT
                </h1>
                <p className="w-6/12 my-3 leading-7  text-gray-700">
                  This very application is our midterm project for Advanced web
                  development course. The project is about handling a few user
                  activities like signing up, logging in, profile viewing and
                  editing,...
                </p>
                <div className="flex items-center gap-5">
                  <p className="text-lg font-semibold">
                    Please check it out here &rarr;
                  </p>
                  <a href="/sign-up">
                    <Button variant="a">Sign up</Button>
                  </a>
                </div>
              </div>
              <img
                className="block animate-spin-slow react-logo"
                src="/logo512.png"
              ></img>
            </div>
          </div>
        <div className="bg-gray-100">
          <div className="w-8/12 mx-auto ">
            <h1 className="text-2xl font-extrabold text-gray-800 py-9 text-center">
              About us
            </h1>
            <div className="grid grid-cols-3 gap-5 md:gap-12">
              {founders.map((founder) => (
                <FounderCard founder={founder}></FounderCard>
              ))}
            </div>
            <div className="w-full h-60"></div>
          </div>
        </div>
      </div>
  );
}

export default LandingPage;
