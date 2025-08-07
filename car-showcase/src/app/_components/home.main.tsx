"use client";

import CarCard from "@/app/_components/car-card.component";
import CustomFilter from "@/app/_components/custom-filter.component";
import Hero from "@/app/_components/hero.component";
import SearchBar from "@/app/_components/search-bar.component";
import ShowMore from "@/app/_components/show-more.component";
import { fuels, yearsOfProduction } from "@/constants/catalogue.constant";
import { useHome } from "../_hooks/home.hook";

const LoadingState = () => (
  <main className="overflow-hidden">
    <Hero />
    <div className="mt-12 padding-x padding-y max-width" id="discover">
      <div className="home__text-container">
        <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
        <p>Explore cars you might like</p>
      </div>
      <div className="home__filters">
        <SearchBar />
        <div className="home__filter-container">
          <CustomFilter title="fuel" options={fuels} />
          <CustomFilter title="year" options={yearsOfProduction} />
        </div>
      </div>

      <div className="mt-16 flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-lg text-gray-600">Loading cars...</p>
        </div>
      </div>
    </div>
  </main>
);

const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
  <main className="overflow-hidden">
    <Hero />
    <div className="mt-12 padding-x padding-y max-width" id="discover">
      <div className="home__text-container">
        <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
        <p>Explore cars you might like</p>
      </div>
      <div className="home__filters">
        <SearchBar />
        <div className="home__filter-container">
          <CustomFilter title="fuel" options={fuels} />
          <CustomFilter title="year" options={yearsOfProduction} />
        </div>
      </div>
      <div className="home__error-container">
        <h2 className="text-black text-xl font-bold">Something went wrong</h2>
        <p className="text-gray-600 mb-4">Failed to load cars data</p>
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  </main>
);

const ResultsSection = ({
  allCars,
  filters,
}: {
  allCars: any[];
  filters: any;
}) => (
  <section>
    <div className="home__cars-wrapper">
      {allCars?.map((car, index) => (
        <CarCard key={`${car.make}-${car.model}-${index}`} car={car} />
      ))}
    </div>
    <ShowMore
      pageNumber={filters.limit / 10}
      isNext={filters.limit > allCars.length}
    />
  </section>
);

const NoResultsState = () => (
  <div className="home__error-container">
    <h2 className="text-black text-xl font-bold">Oops, no results</h2>
    <p className="text-gray-600">No cars found matching your criteria</p>
  </div>
);

const InitialState = () => (
  <div className="home__error-container">
    <h2 className="text-black text-xl font-bold">No cars found</h2>
    <p className="text-gray-600">
      Use the search bar or filters above to discover cars
    </p>
  </div>
);

export default function HomeMain() {
  const {
    filters,
    allCars,
    isLoading,
    isError,
    shouldFetch,
    showResults,
    showNoResults,
    showInitialState,
    mutate,
  } = useHome();

  if (shouldFetch && isLoading) {
    return <LoadingState />;
  }

  if (shouldFetch && isError) {
    return <ErrorState onRetry={mutate} />;
  }

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>

        {showResults && <ResultsSection allCars={allCars} filters={filters} />}

        {showNoResults && <NoResultsState />}

        {showInitialState && <InitialState />}
      </div>
    </main>
  );
}
