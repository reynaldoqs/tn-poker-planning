import { useBoundStore } from "~/stores";
import shallow from "zustand/shallow";

export const GameController: React.FC = () => {
  const boardStatus = useBoundStore((state) => state.boardStatus, shallow); //CHECK HOW SHALLOW WORKS
  const localBoardStatus = useBoundStore((state) => state.localBoardStatus);
  const nextGameState = useBoundStore((state) => state.nextGameState);
  return (
    <>
      Audiman {localBoardStatus} <div>board status: {boardStatus}</div>
      <div>local status: {localBoardStatus}</div> <div>Action</div>
      <button onClick={nextGameState}>next state</button>
    </>
  );
};
