import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FormEvent, useEffect, useState } from "react";
import { ZodError } from "zod";

import {
  Button,
  Checkbox,
  Input,
  IssuesList,
  Label,
  Modal,
  Select,
  ToggleGroup,
} from "~/components";
import { DECK_CARDS, DECK_OPTIONS } from "~/constants";
import useUserStore from "~/stores/user";
import { Room, RoomConfig, RoomSchema } from "~/types";
import { extractErrorMsg } from "~/utils";

const initialValues: Room = {
  roomConfig: {
    title: "",
    whoCanManage: "OWNER",
    authentication: { required: false },
  },
  boardConfig: {
    voteType: "STRING",
    voteValues: DECK_CARDS.fibonacci.values,
  },
  boardStatus: "INIT",
  players: [],
};

export const RoomCreationForm: React.FC = (props) => {
  const currentUser = useUserStore((state) => state.user);
  const initialValuesWithOwner: Room = {
    ...initialValues,
    roomConfig: {
      ...initialValues.roomConfig,
      ...(currentUser && {
        owner: {
          providerId: currentUser.userId,
          provider: currentUser.provider,
        },
      }),
    },
  };
  const [roomForm, setRoomForm] = useState<Room>(initialValuesWithOwner);
  const [error, setError] = useState<ZodError | null>(null);
  const [issuesModal, setIssuesModal] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsedRoom = RoomSchema.safeParse(roomForm);
    const isValidFormData = parsedRoom.success;
    if (!isValidFormData) {
      setError(parsedRoom.error);
      return;
    }
  };

  useEffect(() => {
    setError(null);
  }, [roomForm]);

  return (
    <section {...props}>
      <form
        className="relative flex w-full flex-col gap-9 rounded-3xl bg-bgMedium px-9 pt-8 pb-10 text-center"
        onSubmit={handleSubmit}
      >
        <h3 className="text-xl font-bold text-txtLight">Poker planning Room</h3>
        <fieldset className="mt-3 text-left">
          <Label htmlFor="game_title">Game title</Label>
          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setRoomForm({
                ...roomForm,
                roomConfig: { ...roomForm.roomConfig, title: e.target.value },
              });
            }}
            errorMessage={error ? extractErrorMsg(error?.issues[0]) : null}
            id="game_title"
            placeholder="Poker planning name"
            actionTitle="Add issue"
            actionIcon={faPlus}
            className="mt-2"
            onActionClick={() => {
              setIssuesModal(true);
            }}
          />
        </fieldset>
        <fieldset className="text-left">
          <Label htmlFor="select_deck">Player Deck</Label>
          <Select
            onValueChange={(val: keyof typeof DECK_CARDS) => {
              setRoomForm({
                ...roomForm,
                boardConfig: {
                  voteType: DECK_CARDS[val].type as any,
                  voteValues: DECK_CARDS[val].values,
                },
              });
            }}
            id="select_deck"
            options={DECK_OPTIONS}
            defaultValue={DECK_OPTIONS[0].value}
            className="mt-2"
          />
        </fieldset>
        <fieldset className="text-left">
          <Label htmlFor="select_management">Who can manage game?</Label>
          <ToggleGroup
            options={[
              { value: "OWNER", label: "Owner" },
              { value: "ANYONE", label: "All players" },
            ]}
            value={roomForm.roomConfig.whoCanManage}
            onValueChange={(value) => {
              if (!value) return;
              setRoomForm({
                ...roomForm,
                roomConfig: {
                  ...roomForm.roomConfig,
                  whoCanManage: value as RoomConfig["whoCanManage"],
                },
              });
            }}
            id="select_management"
            className="mt-2"
          />
        </fieldset>
        <fieldset className="text-left">
          <Label>Extra options</Label>
          <Checkbox
            checked={roomForm.roomConfig.withReactions}
            onCheckedChange={(val) => {
              setRoomForm({
                ...roomForm,
                roomConfig: {
                  ...roomForm.roomConfig,
                  withReactions: !!val,
                },
              });
            }}
            className="mt-3"
            label="Allow result reactions"
            id="allow_reaction"
          />
        </fieldset>
        <Button title="Continue" size="lg" className="mx-auto mt-7 w-11/12" />
      </form>
      <Modal
        open={issuesModal}
        onOpenChange={(val) => setIssuesModal(val)}
        title="Issues List"
      >
        <IssuesList
          roomConfig={roomForm.roomConfig}
          onIssuesUpdate={(issuesList) => {
            setRoomForm({
              ...roomForm,
              roomConfig: {
                ...roomForm.roomConfig,
                issues: issuesList,
              },
            });
          }}
        />
      </Modal>
    </section>
  );
};
