import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameLocation, TravellerPoints } from "../../../types/gameTypes";
import { EncounterCard, TravellerCard } from "../components";
import { socket } from "../socket/socket";

const GamePage = () => {
  const isGuide: boolean =
    localStorage.getItem("player") === localStorage.getItem("token");

  const navigate = useNavigate();
  const [gameLocation, setGameLocation] = useState<GameLocation>({
    gameId: "",
    gameName: "",
    guide: null,
    travellers: [],
    place: null,
  });
  const [travellersPoints, setTravellersPoints] = useState<TravellerPoints[]>();

  useEffect(() => {
    if (!gameLocation.place) {
      socket.emit(
        "send-game-location",
        localStorage.getItem("token") + "",
        null,
        "first"
      );
    } else {
      socket.emit(
        "send-game-location",
        localStorage.getItem("token") + "",
        null,
        "current"
      );
    }
    socket.emit("send-travellers-points", localStorage.getItem("token") + "");
    socket.on(
      "get-travellers-points",
      (travellersPoints: TravellerPoints[]) => {
        setTravellersPoints(travellersPoints);
        console.log("TRAVELLERS");
      }
    );
    socket.on("get-game-location", (gameLocation: GameLocation) => {
      setGameLocation(gameLocation);
      console.log("whole");
    });

    socket.on("get-game-finish", (finished: boolean) => {
      finished && navigate("/");
    });
  }, [navigate]);

  return (
    <div>
      Game Page
      <div>
        <h1>Current Place</h1>
        {gameLocation.place && gameLocation.place.name}
      </div>
      ENCOUNTER
      <div>
        {gameLocation && gameLocation.place && gameLocation.place.encounter && (
          <EncounterCard encounter={gameLocation.place.encounter}>
            <div>
              {localStorage.getItem("token") ===
                localStorage.getItem("player") && (
                <select
                  onChange={(e) => {
                    socket.emit(
                      "send-game-location",
                      localStorage.getItem("token") + "",
                      gameLocation.place,
                      null,
                      null,
                      e.target.value
                    );
                  }}
                >
                  <option value={"all"}>all</option>
                  {gameLocation &&
                    gameLocation.travellers.map((t) => {
                      return <option value={t.id}>{t.name}</option>;
                    })}
                </select>
              )}
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
