import type { NextPage } from "next";

import Head from "next/head";

import {
  RoomCreationForm,
  DropRoot,
  MainBackground,
  HomeNavbar,
  Footer,
} from "~/components";

const Home: NextPage = () => {
  return (
    <MainBackground className="grid grid-cols-1 grid-rows-[112px_1fr_52px]">
      <HomeNavbar className="z-10" />
      <main className="container z-10 mx-auto mt-24 flex flex-1 gap-28">
        <section className="w-[464px]">
          <RoomCreationForm />
        </section>
        <section className="flex-1 pt-20">
          <DropRoot />
        </section>
      </main>
      <Footer className="z-10" />
    </MainBackground>
  );
};

export default Home;
