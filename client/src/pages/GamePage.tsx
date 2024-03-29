import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GamePlayers, Place, TravellerPoints } from "../../../types/gameTypes";
import { EncounterCard, GuideCard, TravellerCard } from "../components";
import { socket } from "../socket/socket";
import {
  BlueLightButton,
  BlueLightText,
  Button,
  NameKind,
  Secret,
} from "../styled";

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

  return (
    <GamePageContainer>
      {isGuide && (
        <ContinueButton
          onClick={() => {
            socket.emit(
              "send-game-location",
              localStorage.getItem("token"),
              location?.id,
              "next"
            );
          }}
        >
          CONTINUE
        </ContinueButton>
      )}
      <NameKind>
        <GameName>{gamePlayers && gamePlayers.gameName}</GameName>
        <PlaceName>{location && location.name}</PlaceName>
      </NameKind>
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
                  isGuide ? (
                    <Secret
                      title={`Reveal Secret to ${t.name}`}
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
                      {travellersPoints &&
                      travellersPoints.length !== 0 &&
                      travellersPoints.filter((tp) => tp.plyerId === t.id)[0]
                        .points !== 0 ? (
                        <BlueLightButton>★</BlueLightButton>
                      ) : (
                        <BlueLightButton
                          style={{
                            color: "black",
                          }}
                        >
                          ★
                        </BlueLightButton>
                      )}
                    </Secret>
                  ) : travellersPoints &&
                    travellersPoints.length !== 0 &&
                    travellersPoints.filter((tp) => tp.plyerId === t.id)[0]
                      .points !== 0 ? (
                    <BlueLightText>★</BlueLightText>
                  ) : (
                    <BlueLightText
                      style={{
                        color: "black",
                      }}
                    >
                      ★
                    </BlueLightText>
                  )
                }
              >
                {isGuide && (
                  <Increase
                    title="Increase Points"
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
                    <BlueLightButton>+</BlueLightButton>
                  </Increase>
                )}
                <BlueLightText>
                  {travellersPoints && travellersPoints.length !== 0 ? (
                    travellersPoints.filter((tp) => tp.plyerId === t.id)[0]
                      .points !== 0 ? (
                      <BlueLightText>
                        {
                          travellersPoints.filter(
                            (tp) => tp.plyerId === t.id
                          )[0].points
                        }
                      </BlueLightText>
                    ) : (
                      <BlueLightText
                        style={{
                          color: "black",
                        }}
                      >
                        {
                          travellersPoints.filter(
                            (tp) => tp.plyerId === t.id
                          )[0].points
                        }
                      </BlueLightText>
                    )
                  ) : (
                    0
                  )}
                </BlueLightText>
                {isGuide && (
                  <Decrease
                    title="Decrease Points"
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
                    <BlueLightButton>-</BlueLightButton>
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
  font-size: 2vw;
`;
const PlaceName = styled.h3`
  margin-top: 0.3vw;
  margin-bottom: 0.7vw;
  font-size: 1.5vw;
`;
const GamePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TravellersContainer = styled.div`
  position: absolute;
  width: 100vw;
  top: 6.5vw;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: flex-start;
  column-gap: 50vw;
  z-index: 0;
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

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-size: cover;
  min-height: 100vh;
  min-width: 100vw;
`;
const ContinueButton = styled(Button)`
  font-family: "Varela Round", sans-serif;
  position: absolute;
  margin-top: 1.5vw;
  left: 85vw;
  font-size: 1vw;
  color: white;
  border: white solid;
  box-shadow: 0 0 0.8vw #ffa791, 0 0 1vw #ffa791, inset 0 0 1.3vw #ffa791;
  &:hover,
  &:focus {
    box-shadow: 0 0 1vw #ffcccc, 0 0 1vw #ffcccc, inset 0 0 1vw #ffcccc;
  }
`;
