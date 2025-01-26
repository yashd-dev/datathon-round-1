import { cn } from "@/lib/utils";
import { Check, Star } from "lucide-react";
export default function Home() {
  return (
    <div className="bg-blue-50 grainy-light">
      <HeroSection />
      <FeaturesSection />
    </div>
  );
}

function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl pb-24 pt-10 sm:grid lg:grid-cols-2 sm:pb-32 lg:gap-x-8 lg:px-8 lg:pt-32 lg:pb-52">
        <div className="px-6 lg:px-0 lg:pt-4">
          <div className="mx-auto max-w-lg text-center sm:text-left flex flex-col items-center lg:items-start">
            <h1
              className={cn(
                "relative tracking-tight sm:text-left mt-10 font-bold !leading-[4rem] text-gray-900 text-5xl md:text-7xl"
              )}
            >
              PolicyAnalyzer
            </h1>
            <p className="mt-8 text-lg lg:pr-10 text-center lg:text-left text-balance md:text-wrap">
              Understanding insurance policies has always been{" "}
              <span className={cn("font-scary font-bold text-blue-500")}>
                complex
              </span>{" "}
              and{" "}
              <span className={cn("font-scary font-bold text-blue-500")}>
                time-consuming
              </span>
              . Not anymore. Introducing a fast, free and open-source policy
              analyzer for your peace of mind.
            </p>

            <ul className="mt-8 space-y-2 font-medium flex flex-col items-center sm:items-start">
              <div className="space-y-2">
                <li className="flex gap-1.5 items-center text-left">
                  <Check className="h-5 w-5 shrink-0 text-blue-500" /> Analyze
                  policies quickly and accurately
                </li>
                <li className="flex gap-1.5 items-center">
                  <Check className="h-5 w-5 shrink-0 text-blue-500" /> Compare
                  hospital bills with policy coverage
                </li>
                <li className="flex gap-1.5 items-center">
                  <Check className="h-5 w-5 shrink-0 text-blue-500" /> Find
                  relevant government schemes
                </li>
              </div>
            </ul>

            <div className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div className="flex -space-x-4">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-blue-50 dark:ring-gray-800"
                    src={`https://thispersondoesnotexist.com/`}
                    alt="User"
                  />
                ))}
              </div>

              <div className="flex flex-col justify-between items-center sm:items-start">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-blue-500 fill-blue-500"
                    />
                  ))}
                </div>

                <p className="">
                  <span className="font-semibold">
                    {(1000).toLocaleString()}
                  </span>{" "}
                  policies analyzed
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative px-8 sm:px-16 md:px-0 mt-28 md:mx-auto md:max-w-xl w-full lg:mx-0 lg:mt-20">
          <img
            alt="try-it"
            aria-hidden="true"
            src="https://images.unsplash.com/photo-1517554558809-9b4971b38f39?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className=" hidden sm:block rounded-2xl"
          />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
    </div>
  );
}

function FeaturesSection() {
  return (
    <section className="bg-blue-100 grainy-dark px-4">
      <div className="mx-auto max-w-6xl gap-6 pb-24 pt-20 sm:pb-32 lg:gap-x-8 lg:px-8 lg:py-40">
        <div className="w-full flex flex-col">
          <div className="flex justify-center text-center">
            <h2 className="font-heading text-5xl lg:text-6xl font-bold leading-tight text-balance sm:leading-none tracking-tight">
              "Insurance policies are{" "}
              <span className="bg-blue-500 text-white font-scary px-3">
                confusing
              </span>
              "
            </h2>
          </div>
          <p className="mx-auto mt-8 text-center text-sm max-w-xl">
            - everyone, probably
          </p>

          <p className="text-center mx-auto mt-12 text-lg max-w-xl text-balance">
            <span className="font-semibold">
              Understanding insurance policies is a daunting task.
            </span>{" "}
            If you've ever tried to decipher the fine print of your policy, you
            know it's like trying to solve a puzzle blindfolded.
          </p>

          <p className="mt-6 sm:mt-12 z-10 text-center mx-auto text-3xl font-semibold">
            Complex insurance policies...
          </p>

          <div className="grid gap-40 sm:grid-cols-2 sm:gap-16 max-w-3xl mx-auto mt-40 text-center">
            <div className="relative z-10">
              <div className="absolute -z-10 left-1/2 -translate-x-1/2 -top-[90px]">
                <div className="absolute inset-x-0 -bottom-0 h-16 bg-gradient-to-t 0 from-blue-100 pointer-events-none"></div>
                <img
                  alt="confused-emoji"
                  src="https://em-content.zobj.net/source/apple/25/confused-face_1f615.png"
                  className="h-24 relative -z-10 select-none"
                />
              </div>
              <p className="font-semibold text-lg">
                ...leave you confused and frustrated
              </p>
              <p className="mt-2 text-balance">
                Imagine trying to understand your coverage when you need it
                most, only to be lost in a sea of legal jargon and confusing
                terms.
              </p>
            </div>

            <div className="relative z-10">
              <div className="absolute -z-10 left-1/2 -translate-x-1/2 -top-[90px]">
                <div className="absolute inset-x-0 -bottom-0 h-16 bg-gradient-to-t from-blue-100 pointer-events-none"></div>
                <img
                  alt="money-emoji"
                  src="https://em-content.zobj.net/source/apple/391/money-mouth-face_1f911.png"
                  className="relative -z-10 h-24 select-none"
                />
              </div>
              <p className="font-semibold text-lg">...can cost you money</p>
              <p className="mt-2 text-balance">
                Not understanding your policy could lead to unexpected
                out-of-pocket expenses or missing out on benefits you're
                entitled to.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
