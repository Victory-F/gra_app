import { Place, Reply } from "../../../types/gameTypes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket/socket";
import {
  Button,
  ButtonsWrapper,
  CreateWrapper,
  Form,
  Input,
  Title,
} from "../styled";
import { BackgroundWrapper } from "../styled/BackgroundWrapper";
import { EncounterCard } from "../components";

const CreateLocationPage = ({
  setMessage,
}: {
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const game: boolean =
    localStorage.getItem("token") && localStorage.getItem("player")
      ? true
      : false;

  const isGuide: boolean = game
    ? localStorage.getItem("token") === localStorage.getItem("player")
    : false;

  const navigate = useNavigate();

  const [addEncounter, setAddEncounter] = useState<boolean>(false);

  const [created, setCreated] = useState<boolean>(false);

  const [location, setLocation] = useState<Place>({
    id: "",
    name: "",
    imgUrl: "",
    encounter: {
      name: "",
      kind: "",
      imgUrl: "",
      description: "",
      secret: "",
    },
  });

  useEffect(() => {
    !isGuide && navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    socket.emit(
      "add-location",
      location,
      localStorage.getItem("token"),
      (response: Reply) => {
        if (response.success) {
          setCreated(true);
        }
        setMessage(response.message);
      }
    );
  };
  return (
    <CreateWrapper>
      {!created ? (
        <Form onSubmit={submitForm}>
          <Title>Create Location</Title>
          <Input
            placeholder="name"
            maxLength={50}
            type="text"
            value={location.name}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setLocation({
                ...location,
                id:
                  e.currentTarget.value.charAt(0) +
                  Math.random().toString().slice(3, 6),
                name: e.currentTarget.value,
              })
            }
            required
          />
          <Input
            placeholder="background image URL"
            type="text"
            value={location.imgUrl}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setLocation({ ...location, imgUrl: e.currentTarget.value })
            }
            required
          />
          {!addEncounter ? (
            <Button
              type="button"
              onClick={() => {
                setAddEncounter(true);
              }}
            >
              Add Encounter
            </Button>
          ) : (
            <Button
              type="button"
              onClick={() => {
                setAddEncounter(false);
                setLocation({
                  ...location,
                  encounter: {
                    name: "",
                    kind: "",
                    imgUrl: "",
                    description: "",
                    secret: "",
                  },
                });
              }}
            >
              Remove Encounter
            </Button>
          )}
          {addEncounter ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Input
                placeholder="name"
                maxLength={15}
                type="text"
                value={location.encounter.name}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setLocation({
                    ...location,
                    encounter: {
                      ...location.encounter,
                      name: e.currentTarget.value,
                    },
                  })
                }
                required
              />
              <Input
                placeholder="kind"
                maxLength={20}
                type="text"
                value={location.encounter.kind}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setLocation({
                    ...location,
                    encounter: {
                      ...location.encounter,
                      kind: e.currentTarget.value,
                    },
                  })
                }
                required
              />
              <Input
                placeholder="image URL"
                type="text"
                value={location.encounter.imgUrl}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setLocation({
                    ...location,
                    encounter: {
                      ...location.encounter,
                      imgUrl: e.currentTarget.value,
                    },
                  })
                }
                required
              />
              <Input
                placeholder="description"
                maxLength={70}
                type="text"
                value={location.encounter.description}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setLocation({
                    ...location,
                    encounter: {
                      ...location.encounter,
                      description: e.currentTarget.value,
                    },
                  })
                }
                required
              />
              <Input
                placeholder="secret"
                maxLength={100}
                type="text"
                value={location.encounter.secret}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setLocation({
                    ...location,
                    encounter: {
                      ...location.encounter,
                      secret: e.currentTarget.value,
                    },
                  })
                }
                required
              />
            </div>
          ) : (
            ""
          )}
          <Button type="submit">CREATE</Button>
        </Form>
      ) : (
        <ButtonsWrapper>
          <Button
            onClick={() => {
              setCreated(false);
              setAddEncounter(false);
              setLocation({
                id: "",
                name: "",
                imgUrl: "",
                encounter: {
                  name: "",
                  kind: "",
                  imgUrl: "",
                  description: "",
                  secret: "",
                },
              });
            }}
          >
            Create Next Location
          </Button>
          <Button onClick={() => navigate("/create-endgame-cases")}>
            Create the Game
          </Button>
        </ButtonsWrapper>
      )}
      {!created && (
        <BackgroundWrapper
          style={{ backgroundImage: `url(${location?.imgUrl})` }}
        >
          {addEncounter && (
            <EncounterCard
              encounter={location.encounter}
              secretVisible={true}
            />
          )}
        </BackgroundWrapper>
      )}
    </CreateWrapper>
  );
};
export { CreateLocationPage };
