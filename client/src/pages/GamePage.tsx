import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
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
      localStorage.getItem("place"),
      "current"
    );

    socket.on("get-game-location", (place: Place) => {
      localStorage.setItem("place", place.id);
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
        (localStorage.getItem("player") === revealTo || revealTo === "all") &&
          setSecretVisible(secretVisible);
      }
    );
    socket.on("end-game", (finished: boolean) => {
      finished && navigate("/end-game");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const GameContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-image: url(${location.imgUrl});
    min-height: 100vh;
    min-width: 100vw;
  `;
  console.log("I rerender");
  return (
    <GamePageContainer>
      <GameName>{gamePlayers && gamePlayers.gameName}</GameName>
      <PlaceName>{location && location.name}</PlaceName>
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
      <GameContainer>
        <TravellersContainer>
          {gamePlayers &&
            location &&
            location.encounter &&
            location.encounter.name && (
              <EncounterCard
                encounter={location.encounter}
                secretVisible={secretVisible}
              />
            )}
          {/* Here we can see traveller card */}
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
                      +
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
                      -
                    </button>
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
                      secret
                    </button>
                  </div>
                )}
              </TravellerCard>
            ))}
        </TravellersContainer>
      </GameContainer>
    </GamePageContainer>
  );
};
export { GamePage };

const GameName = styled.h1`
  margin-bottom: 0;
`;
const PlaceName = styled.h3`
  margin-top: 0.3rem;
`;
const GamePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100vh;
  min-height: 100vh;
`;
const TravellersContainer = styled.div`
  display: flex;
  flex-flow: row wrap;

  justify-content: space-between;
  align-items: center;
`;
