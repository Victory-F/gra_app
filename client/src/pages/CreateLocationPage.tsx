import { Place } from "../../../types/gameTypes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket/socket";

const CreateLocationPage = () => {
  const navigate = useNavigate();
  const [addEncounter, setAddEncounter] = useState<boolean>(false);

  const [created, setCreated] = useState(false);

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
      secretVisibleTo: [],
    },
  });

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("add-location", location, localStorage.getItem("token"));
    setCreated(true);
  };
  return (
    <div>
      <h1>Create Location</h1>
      {!created ? (
        <form onSubmit={submitForm}>
          <h3>Location</h3>
          <input
            placeholder="name"
            type="text"
            value={location.name}
            onChange={(e) =>
              setLocation({
                ...location,
                id: (Math.random() * 1000).toString().slice(0, 4),
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
          <div>
            <div>
              <h4>Encounter</h4>
              <input
                type="checkbox"
                onChange={(e) => {
                  setAddEncounter(e.target.checked);
                  setLocation(
                    e.target.checked
                      ? { ...location }
                      : {
                          ...location,
                          encounter: {
                            name: "",
                            kind: "",
                            imgUrl: "",
                            description: "",
                            secret: "",
                            secretVisibleTo: [],
                          },
                        }
                  );
                }}
              />
            </div>
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
          <button type="submit">Done</button>
        </form>
      ) : (
        <div>
          Location Created
          <br />
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
                  secretVisibleTo: [],
                },
              });
            }}
          >
            Create Next Location
          </button>
          <button onClick={() => navigate("/create-game-name")}>
            Create the Game
          </button>
        </div>
      )}
    </div>
  );
};
export { CreateLocationPage };
