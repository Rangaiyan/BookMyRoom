import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import swal from 'sweetalert';
const { TabPane } = Tabs;

function Adminscreen() {
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
      window.location.href = "/home";
    }
  });

  return (
    <div className="mt-5 rounded-4 ml-5 mr-5 bg-white border-5 p-4 w-200px shadow text-left flex-column ">
      <div className="justify-content-start">
        <h1 className="text-center">Admin Panel</h1>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Bookings" key="1">
            <Bookings />
          </TabPane>
          <TabPane tab="Rooms" key="2">
            <Rooms />
          </TabPane>
          <TabPane tab="Add Room" key="3">
            <h1>Add Rooms</h1>
            <Addroom/>
          </TabPane>
          <TabPane tab="Users" key="4">
            <Users />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default Adminscreen;


// Booking Screen Part

export function Bookings() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        if (!user) {
          throw new Error("User not logged in");
        }

        const response = await axios.post("/api/bookings/getbookingsbyuserid", {
          userid: user._id,
        });
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(true);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error message="Failed to load bookings." />;
  }

  return (
    <div className="row ">
      <div className="col-md-10 w-100">
        <h1>Bookings</h1>
        <table className="table table-bordered table-dark rounded-4">
          <thead className="shadow thead-dark">
            <tr>
              <th>BookingID</th>
              <th>UserID</th>
              <th>Room</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length ? (
              bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking._id}</td>
                  <td>{booking.userid}</td>
                  <td>{booking.room}</td>
                  <td>{booking.fromdate}</td>
                  <td>{booking.todate}</td>
                  <td>{booking.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No bookings found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


// Rooms Screen it will display all Rooms

export function Rooms() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("/api/rooms/getallrooms");
        setRooms(response.data.rooms);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(true);
        setLoading(false);
      }
    };

    fetchRooms();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error message="Failed to load rooms." />;
  }

  return (
    <div className="row ">
      <div className="col-md-10 w-100">
        <h1>Rooms</h1>
        <table className="table table-bordered table-dark">
          <thead className="shadow thead-dark">
            <tr>
              <th>Room ID</th>
              <th>Name</th>
              <th>No of beds</th>
              <th>Room No</th>
              <th>Rent Per Day</th>
              <th>Phone number</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length > 0 ? (
              rooms.map((room) => (
                <tr key={room._id}>
                  <td>{room._id}</td>
                  <td>{room.name}</td>
                  <td>{room.no_of_beds}</td>
                  <td>{room.room_no}</td>
                  <td>{room.rentperday}</td>
                  <td>{room.phonenumber}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No rooms found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// users Screen it will display all Rooms

export function Users() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users/getallusers");
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(true);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error message="Failed to load users." />;
  }

  return (
    <div className="row  ">
      <div className="col-md-12">
        <h1>Users</h1>
        <table className="table table-dark table-bordered">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Is Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? "YES" : "NO"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Add Rooms Part

export  function Addroom() {

  const [name, setName] = useState('');
  const [rentPerDay, setRentPerDay] = useState('');
  const [noOfBeds, setNoOfBeds] = useState('');
  const [description, setDescription] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amenities, setAmenities] = useState('');
  const [imageUrl1, setImageUrl1] = useState('');
  const [imageUrl2, setImageUrl2] = useState('');
  const [imageUrl3, setImageUrl3] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function addRoom() {
    const newRoom = {
      name,
      rentperday: rentPerDay,
      description,
      no_of_beds: noOfBeds,
      phonenumber: phoneNumber,
      amenities,
      imageurls: [imageUrl1, imageUrl2, imageUrl3],
      room_no: roomNumber,
      currentbookings: []
    };

    try {
      setLoading(true);
      const result = await axios.post('/api/rooms/addroom', newRoom);
      console.log(result.data);
      setLoading(false);
      swal('Congratulations', 'Room Added successfully', 'success').then(result=>{
        window.location.href='/home'
      });
    } catch (error) {
      console.error(error);
      setError(true);
      setLoading(false);
      swal('Oops', 'Something went wrong', 'error');
    }
  }

  return (
    <div className="row shadow p-4 rounded-4 bg-dark">
      <div className="col-md-6">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Room name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Rent per day"
          value={rentPerDay}
          onChange={(e) => setRentPerDay(e.target.value)}
        />
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          className="form-control mb-3"
          placeholder="No of beds"
          value={noOfBeds}
          onChange={(e) => setNoOfBeds(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <div className="col-md-6">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Amenities"
          value={amenities}
          onChange={(e) => setAmenities(e.target.value)}
        />
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Image URL 1"
          value={imageUrl1}
          onChange={(e) => setImageUrl1(e.target.value)}
        />
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Image URL 2"
          value={imageUrl2}
          onChange={(e) => setImageUrl2(e.target.value)}
        />
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Image URL 3"
          value={imageUrl3}
          onChange={(e) => setImageUrl3(e.target.value)}
        />
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Room number"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
        />
        <button className="btn btn-light" style={{ float: 'right', color: 'white' }} onClick={addRoom}>
          Add Room
        </button>
      </div>
      {loading && <Loader />}
      {/* {error && <Error message="Failed to add room. Please try again later." />} */}
    </div>
  );
}