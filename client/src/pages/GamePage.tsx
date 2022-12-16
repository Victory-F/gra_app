import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Place } from "../../../types/gameTypes";
import { socket } from "../socket/socket";

const GamePage = () => {
  const navigate = useNavigate();

  const [thisLocation, setThisLocation] = useState<Place>({
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

  socket.emit("join-room", localStorage.getItem("token"));

  const locationNumber: number =
    parseInt(localStorage.getItem("location") + "") + 1;

  useEffect(() => {
    socket.emit("send-location", localStorage.getItem("token"), locationNumber);
  }, []);

  socket.on("receive-location", (location) => {
    setThisLocation(location);
    console.log(location.toString());
  });

  console.log("I rerender");
  return (
    <div>
      Game Page
      <div>
        <h1>Current Place</h1>
        {thisLocation.name ? thisLocation.name : "Loading..."}
      </div>
      <button
        onClick={() => {
          localStorage.setItem("location", locationNumber.toString());
        }}
      >
        Next Location
      </button>
    </div>
  );
};
export { GamePage };
