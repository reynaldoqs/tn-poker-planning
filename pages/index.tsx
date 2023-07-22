import type { NextPage } from 'next';

if (typeof window !== 'undefined') {
  class MyTitle extends HTMLElement {
    #root: ShadowRoot;
    constructor() {
      super();
      this.#root = this.attachShadow({ mode: 'open' });
      this.#root.innerHTML = `
        <style>h1 {color: red}</style>
        <h1>
        <slot></slot>
        </h1>
      `;
    }
  }
  customElements.define('my-title', MyTitle);
}
//import Head from 'next/head';
import {
  DropRoot,
  Footer,
  MainBackground,
  MainNavbar,
  RoomCreationForm,
} from '~/components';

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
