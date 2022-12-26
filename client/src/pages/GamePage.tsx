import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GamePlayers, Place, TravellerPoints } from "../../../types/gameTypes";
import { EncounterCard, GuideCard, TravellerCard } from "../components";
import { socket } from "../socket/socket";
import { Secret } from "../styled";

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
    guide: {
      id: "",
      name: "",
      kind: "",
      description: "",
      imgUrl: "",
    },
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

  console.log("I rerender");
  return (
    <GamePageContainer>
      <GameName>{gamePlayers && gamePlayers.gameName}</GameName>
      <PlaceName>
        {location && location.name}
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
      </PlaceName>

      <GameContainer style={{ backgroundImage: `url(${location?.imgUrl})` }}>
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
        <TravellersContainer>
          {gamePlayers &&
            gamePlayers.travellers.map((t) => (
              <TravellerCard
                key={t.id}
                traveller={t}
                secretButton={
                  <Secret
                    onClick={() => {
                      isGuide &&
                        socket.emit(
                          "set-secret-visible",
                          localStorage.getItem("token"),
                          t.id,
                          true
                        );
                    }}
                  >
                    🔮
                  </Secret>
                }
              >
                {isGuide && (
                  <Increase
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
                    ✨
                  </Increase>
                )}
                <Points>
                  {travellersPoints && travellersPoints.length !== 0
                    ? travellersPoints.filter((tp) => tp.plyerId === t.id)[0]
                        .points
                    : 0}
                </Points>
                {isGuide && (
                  <Decrease
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
                    🪄
                  </Decrease>
                )}
              </TravellerCard>
            ))}
        </TravellersContainer>
        <GuideCard guide={gamePlayers.guide} />
      </GameContainer>
    </GamePageContainer>
  );
};
export { GamePage };

const GameName = styled.h1`
  margin-bottom: 0;
  margin-top: 0.5vw;
`;
const PlaceName = styled.h3`
  margin-top: 0.3vw;
  margin-bottom: 0.2vw;
`;
const GamePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TravellersContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 10rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: flex-start;
  column-gap: 50%;
`;

const Increase = styled.button`
  width: 15%;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1.3vw;
  padding: 0;
`;

const Decrease = styled.button`
  width: 15%;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1.3vw;
  padding: 0;
`;
const Points = styled.h3`
  margin: 0;
  font-size: 1.5vw;
`;
const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-size: cover;
  min-height: 100vh;
  min-width: 100vw;
`;
