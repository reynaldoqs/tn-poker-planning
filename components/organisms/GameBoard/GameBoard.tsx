import { MouseEventHandler, useRef } from "react";

export const GameBoard: React.FC = () => {
  const currentUserSlot = useRef<HTMLDivElement>(null);
  const onVote = (e: MouseEventHandler<HTMLElement>) => {
    console.log(e);
  };

  return (
    <div className="relative h-2/3 w-full bg-black">
      <div className="flex gap-3">
        <div className="h-28 w-16 bg-slate-600"></div>
        <div className="h-28 w-16 bg-blue-600" ref={currentUserSlot}></div>
        <div className="h-28 w-16 bg-slate-600"></div>
      </div>
      <div className="mt-96 flex h-28 w-full gap-4 bg-gray-800">
        <section
          className="h-28 w-16 bg-red-500"
          onClick={(e) => {
            console.log(e);
          }}
        >
          a
        </section>
        <section className="h-28 w-16 bg-red-500">b</section>
      </div>
    </div>
  );
};
