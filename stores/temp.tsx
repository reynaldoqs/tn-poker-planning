import useUserStore from "./user";

export const StoreTemp: React.FC = () => {
  const user = useUserStore((state: any) => state.user);
  const uploadUser = useUserStore((state: any) => state.updateUser);
  return (
    <>
      {JSON.stringify(user)}
      <button onClick={uploadUser} className="z-50 bg-red-400 p-2 text-red-200">
        update asd
      </button>
    </>
  );
};
