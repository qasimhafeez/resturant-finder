import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { useEffect, useState } from "react";
import axios from "axios";
import LocationInfo from "./locationInfo";
const mapStyles = {
  width: "100%",
  height: "100%",
};
const NewMap = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [boxInfo, setBoxInfo] = useState({
    restaurantsName: "",
    address: "",
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/restaurants")
      .then((res) => setRestaurants(res.data.result));
  }, []);

  const displayMarkers = () => {
    return restaurants.map((restaurant, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: restaurant.lat,
            lng: restaurant.log,
          }}
          onClick={() => {
            setBoxInfo({
              restaurantsName: restaurant.restaurantsName,
              address: restaurant.address,
            });
            setOpen(true);
          }}
        ></Marker>
      );
    });
  };
  return (
    <>
      <LocationInfo
        restaurantsName={boxInfo.restaurantsName}
        address={boxInfo.address}
        open={open}
        setOpen={setOpen}
      />
      <Map
        google={props.google}
        zoom={8}
        style={mapStyles}
        initialCenter={{ lat: 47.444, lng: -122.176 }}
      >
        {displayMarkers()}
      </Map>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyB1O-waPrUNTc8qiA7ST04pISY3SRlHxSg",
})(NewMap);
