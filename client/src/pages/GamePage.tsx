import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GamePlayers, Place, TravellerPoints } from "../../../types/gameTypes";
import { EncounterCard, TravellerCard } from "../components";
import { socket } from "../socket/socket";

const GamePage = () => {
  const game: boolean =
    localStorage.getItem("token") && localStorage.getItem("player")
      ? true
      : false;

  const isGuide: boolean = game
    ? localStorage.getItem("token") === localStorage.getItem("player")
    : false;

  const navigate = useNavigate();

  const [gamePlayers, setGamePlayers] = useState<GamePlayers>({
    gameId: "",
    gameName: "",
    guide: null,
    travellers: [],
  });

  const [travellersPoints, setTravellersPoints] = useState<TravellerPoints[]>();

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
  console.log(location.id);
  const [secretVisible, setSecretVisible] = useState<boolean>(false);

  useEffect(() => {
    !game && navigate("/");

    socket.emit(
      "send-game-players",
      localStorage.getItem("token"),
      localStorage.getItem("player")
    );

    socket.on("get-game-players", (gamePlayers: GamePlayers) => {
      setGamePlayers(gamePlayers);
    });

    socket.emit(
      "send-game-location",
      localStorage.getItem("token"),
      location.id,
      "current"
    );

    socket.on("get-game-location", (place: Place) => {
      setLocation(place);
      setSecretVisible(false);
    });

    socket.emit("send-travellers-points", localStorage.getItem("token") + "");
    socket.on(
      "get-travellers-points",
      (travellersPoints: TravellerPoints[]) => {
        setTravellersPoints(travellersPoints);
      }
    );

    socket.on(
      "get-secret-visible",
      (revealTo: string, secretVisible: boolean) => {
        localStorage.getItem("player") === revealTo ||
          (revealTo === "all" && setSecretVisible(secretVisible));
      }
    );
    ///MAKE ENDGAME PAGE
    socket.on("get-game-finish", (finished: boolean) => {
      finished && navigate("/");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      Game Page
      <div>
        <h1>Current Place</h1>
        {location && location.name}
      </div>
      <div>
        {gamePlayers &&
          location &&
          location.encounter &&
          location.encounter.name && (
            <EncounterCard
              encounter={location.encounter}
              secretVisible={secretVisible}
            >
              <div>
                {isGuide &&
                  gamePlayers &&
                  gamePlayers.travellers.map((t) => {
                    return (
                      <div>
                        <button
                          onClick={() => {
                            socket.emit(
                              "set-secret-visible",
                              localStorage.getItem("token"),
                              t.id,
                              true
                            );
                          }}
                        >
                          Reveal secret to: {t.name}
                        </button>
                      </div>
                    );
                  })}
                <div>
                  {isGuide && (
                    <button
                      onClick={() => {
                        socket.emit(
                          "set-secret-visible",
                          localStorage.getItem("token"),
                          "all",
                          true
                        );
                      }}
                    >
                      Reveal secret to all!!!
                    </button>
                  )}
                </div>
              </div>
            </EncounterCard>
          )}
      </div>
      {/* Here we can see traveller card */}
      <div>
        {gamePlayers &&
          gamePlayers.travellers.map((t) => (
            <TravellerCard
              traveller={t}
              travellerPoints={
                travellersPoints && travellersPoints.length !== 0
                  ? travellersPoints.filter((tp) => tp.plyerId === t.id)[0]
                      .points
                  : 0
              }
            >
              {isGuide && (
                <div>
                  <button
                    onClick={() => {
                      socket.emit(
                        "send-travellers-points",
                        gamePlayers.gameId,
                        t.id,
                        true,
                        false
                      );
                    }}
                  >
                    IncreasePoints
                  </button>
                  <button
                    onClick={() => {
                      socket.emit(
                        "send-travellers-points",
                        gamePlayers.gameId,
                        t.id,
                        false,
                        true
                      );
                    }}
                  >
                    Decrease Points
                  </button>
                </div>
              )}
            </TravellerCard>
          ))}
      </div>
      {isGuide && (
        <button
          onClick={() => {
            socket.emit(
              "send-game-location",
              localStorage.getItem("token"),
              location?.id,
              "next"
            );
          }}
        >
          Continue
        </button>
      )}
    </div>
  );
};
export { GamePage };
