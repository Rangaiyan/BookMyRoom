import React, { useEffect, useState } from "react";
import Rooms from "../components/Rooms";
import Loader from "../components/Loader";
import Error from "../components/Error";
import "./Register.css";
import { DatePicker, Space } from "antd";
import moment from "moment";
const { RangePicker } = DatePicker;

function Homescreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();
  const [duplicaterooms, setduplicaterooms] = useState([]);
  const [searchkey, setsearchkey] = useState('');
  const [type, settype] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/rooms/getallrooms");
        const data = await response.json();
      //  setduplicaterooms(data);
        console.log("Data received from API:", data);

        if (Array.isArray(data)) {
          setRooms(data);
          setduplicaterooms(data);
          setLoading(false);
        } else if (data.rooms && Array.isArray(data.rooms)) {
          setRooms(data.rooms);
          setLoading(false);
        } else {
          console.error("Expected an array but received:", data);
          setError(true);
          setLoading(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  function filterbydate(dates) {
    setfromdate(dates[0].format("DD-MM-YYYY"));
    settodate(dates[1].format("DD-MM-YYYY"));
    // Date filtering logic here
  }

  function filterBysearch() {
    const temprooms = duplicaterooms.filter(room =>
      room.name.toLowerCase().includes(searchkey.toLowerCase())
    );
    setRooms(temprooms);
  }
  

  function filterByType(type) {
    settype(type);
    const temprooms = type === 'all' ? duplicaterooms : duplicaterooms.filter(room => room.type.toLowerCase() === type.toLowerCase());
    setRooms(temprooms);
  }

  // useEffect(() => {
  //   filterBysearch();
  // }, [searchkey]);

  // useEffect(() => {
  //   filterByType(type);
  // }, [type]);

  return (
    <div className="container">
      <div className="row mt-5 date justify-content-center">
        <div className="col-md-3 ">
          <RangePicker onChange={filterbydate} format="DD-MM-YYYY" className="h-100 shadow" />
        </div>

        <div className="col-md-5">
          <input
            type="text"
            className="form-control shadow"
            placeholder="search locations"
            value={searchkey}
            onChange={(e) => setsearchkey(e.target.value)}
            onKeyUp={filterBysearch}
          ></input>
        </div>
        <div className="col-md-3">
          <select
            className="form-control shadow"
            value={type}
            onChange={(e) => filterByType(e.target.value)}
          >
            <option value="all">All</option>
            <option value="ac">AC</option>
            <option value="wifi">WIFI</option>
            <option value="tv">TV</option>
          </select>
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader />
        ) : (
          rooms.map((room) => {
            return (
              <div key={room._id} className="col-md-10">
                <Rooms room={room} fromdate={fromdate} todate={todate} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Homescreen;
