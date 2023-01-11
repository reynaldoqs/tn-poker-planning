import type { NextPage } from "next";

import Head from "next/head";

import {
  RoomCreationForm,
  DropRoot,
  MainBackground,
  MainNavbar,
  Footer,
} from "~/components";

const Home: NextPage = () => {
  return (
    <MainBackground>
      <div className="flex h-full grid-cols-1 grid-rows-[112px_1fr_52px] flex-col gap-10 overflow-y-auto md:grid md:gap-0 md:overflow-hidden">
        <MainNavbar className="z-10 min-h-[100px]" id="home" />
        <main className="container z-10 mx-auto flex flex-1 flex-col gap-10 md:mt-24 md:flex-row md:gap-12 lg:gap-28">
          <section className="h-fit w-full px-4 md:w-[464px] md:px-0">
            <RoomCreationForm />
          </section>
          <section className="w-full px-4 md:w-[calc(100%-464px)] md:px-0 md:pt-20 lg:flex-1">
            <DropRoot />
          </section>
        </main>
        <Footer className="z-10 min-h-[52px]" />
      </div>
    </MainBackground>
  );
};

export default Home;
