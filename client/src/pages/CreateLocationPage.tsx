import { Place, Reply } from "../../../types/gameTypes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket/socket";

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
    <div>
      <h1>Create Location</h1>
      {!created ? (
        <form onSubmit={submitForm}>
          <div>
            <h3>Location</h3>
            <input
              placeholder="name"
              type="text"
              value={location.name}
              onChange={(e) =>
                setLocation({
                  ...location,
                  id:
                    e.target.value.charAt(0) +
                    Math.random().toString().slice(3, 6),
                  name: e.target.value,
                })
              }
              required
            />
            <br />
            <input
              placeholder="image/gif URL"
              type="text"
              value={location.imgUrl}
              onChange={(e) =>
                setLocation({ ...location, imgUrl: e.target.value })
              }
              required
            />
            <br />
          </div>
          <div>
            <button
              type="button"
              onClick={() => {
                setAddEncounter(true);
              }}
            >
              Add Encounter
            </button>
            <button
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
            </button>

            {addEncounter ? (
              <div>
                <input
                  placeholder="name"
                  type="text"
                  value={location.encounter.name}
                  onChange={(e) =>
                    setLocation({
                      ...location,
                      encounter: {
                        ...location.encounter,
                        name: e.target.value,
                      },
                    })
                  }
                  required
                />
                <br />
                <input
                  placeholder="kind"
                  type="text"
                  value={location.encounter.kind}
                  onChange={(e) =>
                    setLocation({
                      ...location,
                      encounter: {
                        ...location.encounter,
                        kind: e.target.value,
                      },
                    })
                  }
                  required
                />
                <br />
                <input
                  placeholder="img/gif URL"
                  type="text"
                  value={location.encounter.imgUrl}
                  onChange={(e) =>
                    setLocation({
                      ...location,
                      encounter: {
                        ...location.encounter,
                        imgUrl: e.target.value,
                      },
                    })
                  }
                  required
                />
                <br />
                <input
                  placeholder="description"
                  type="text"
                  value={location.encounter.description}
                  onChange={(e) =>
                    setLocation({
                      ...location,
                      encounter: {
                        ...location.encounter,
                        description: e.target.value,
                      },
                    })
                  }
                  required
                />
                <br />
                <input
                  placeholder="secret"
                  type="text"
                  value={location.encounter.secret}
                  onChange={(e) =>
                    setLocation({
                      ...location,
                      encounter: {
                        ...location.encounter,
                        secret: e.target.value,
                      },
                    })
                  }
                  required
                />
                <br />
              </div>
            ) : (
              ""
            )}
          </div>
          <br />
          <button type="submit">Done</button>
        </form>
      ) : (
        <div>
          <button
            onClick={() => {
              setCreated(false);
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
          </button>
          <button onClick={() => navigate("/create-endgame-cases")}>
            Create the Game
          </button>
        </div>
      )}
    </div>
  );
};
export { CreateLocationPage };
