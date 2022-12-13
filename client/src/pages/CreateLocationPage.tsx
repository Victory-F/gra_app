import { Place } from "../../../types/gameTypes";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPlace } from "../store/game/slice";

const CreateLocationPage = () => {
  const [addEncounter, setAddEncounter] = useState<boolean>(false);

  const dispatch = useDispatch();

  const [location, setLocation] = useState<Place>({
    name: "",
    imgUrl: "",
    encounter: {
      name: "",
      kind: "",
      imgUrl: "",
      description: "",
      secret: "",
      visibleTo: [],
    },
  });

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addPlace(location));
    console.log(location);
  };
  return (
    <div>
      <h1>Create Location</h1>
      <form onSubmit={submitForm}>
        <h3>Location</h3>
        <input
          placeholder="name"
          type="text"
          value={location.name}
          onChange={(e) => setLocation({ ...location, name: e.target.value })}
          required
        />
        <br />
        <input
          placeholder="image/gif URL"
          type="text"
          value={location.imgUrl}
          onChange={(e) => setLocation({ ...location, imgUrl: e.target.value })}
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
                          visibleTo: [],
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
                    encounter: { ...location.encounter, name: e.target.value },
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
                    encounter: { ...location.encounter, kind: e.target.value },
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
      <button>Create Next Location</button>
      <button>Create the Game</button>
    </div>
  );
};
export { CreateLocationPage };
