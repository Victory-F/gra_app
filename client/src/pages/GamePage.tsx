import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameLocation, TravellerPoints } from "../../../types/gameTypes";
import { EncounterCard, TravellerCard } from "../components";
import { socket } from "../socket/socket";

const GamePage = () => {
  const gameId: string = localStorage.getItem("token") + "";
  const playerId: string = localStorage.getItem("player") + "";
  const isGuide: boolean = gameId === playerId;

  const navigate = useNavigate();

  const [gameLocation, setGameLocation] = useState<GameLocation>({
    gameId: "",
    gameName: "",
    guide: null,
    travellers: [],
    place: null,
  });
  const [travellersPoints, setTravellersPoints] = useState<TravellerPoints[]>();

  const [secretVisible, setSecretVisible] = useState<boolean>(false);

  useEffect(() => {
    if (!gameLocation.place) {
      socket.emit("send-game-location", gameId, null, "first");
    } else {
      socket.emit("send-game-location", gameId, null, "current");
    }
    socket.on("get-game-location", (gameLocation: GameLocation) => {
      setGameLocation(gameLocation);
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
        playerId === revealTo ||
          (revealTo === "all" && setSecretVisible(secretVisible));
      }
    );

    socket.on("get-game-finish", (finished: boolean) => {
      finished && navigate("/");
    });
  }, [navigate]);
  console.log(secretVisible);

  return (
    <div>
      Game Page
      <div>
        <h1>Current Place</h1>
        {gameLocation.place && gameLocation.place.name}
      </div>
      <div>
        {gameLocation &&
          gameLocation.place &&
          gameLocation.place.encounter &&
          gameLocation.place.encounter.name && (
            <EncounterCard
              encounter={gameLocation.place.encounter}
              secretVisible={secretVisible}
            >
              <div>
                {isGuide &&
                  gameLocation &&
                  gameLocation.travellers.map((t) => {
                    return (
                      <div>
                        <button
                          onClick={() => {
                            socket.emit(
                              "set-secret-visible",
                              gameId,
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
                        socket.emit("set-secret-visible", gameId, "all", true);
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
        {gameLocation &&
          gameLocation.travellers.map((t) => (
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
                        gameLocation.gameId,
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
                        gameLocation.gameId,
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
              gameLocation.gameId,
              gameLocation.place,
              "next"
            );
          }}
        >
          Next Location
        </button>
      )}
    </div>
  );
};
export { GamePage };
