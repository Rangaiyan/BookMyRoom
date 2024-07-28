import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from "sweetalert2";
import { Divider, Flex, Tag } from 'antd';

const { TabPane } = Tabs;

function Profilescreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, [user]);

  return (
    <div className="container mt-3">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1" >
          <div className="row">
            <div className="col-md-6">
              <div className="bg-white p-3 rounded-4 shadow mb-3">
                <div className="card-body text-left">
                  <h3 className="card-title">My Profile</h3>
                  <br/>
                  <p className="card-text"><b>Name    :</b> {user?.name}</p>
                  <p className="card-text"><b>Email:</b> {user?.email}</p>
                  <p className="card-text">
                   <b> isAdmin: </b>{user?.isAdmin ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane tab="My Bookings" key="2">
          <Mybookings />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Profilescreen;

export function Mybookings() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [bookings, setBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const fetchBookings = async () => {
      try {
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

    if (user) {
      fetchBookings();
    }
  }, [user]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error message="Failed to load bookings." />;
  }

  async function cancelBooking(bookingid, roomid) {
    try {
      setLoading(true);
      const result = await (
        await axios.post("api/bookings/cancelbooking", { bookingid, roomid })
      ).data;
      console.log(result);
      setLoading(false);
      Swal.fire("Congrats", "Room Cancelled Successfully", "success").then(
        (result) => {
          window.location.reload();
        }
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire("Oops", "Something went wrong", "error");
    }
  }

  return (
    <div className="row">
      <div className="col-md-6 ">
        {bookings.map((booking) => (
          <div className="bg-white p-4 rounded-4 shadow mb-3  " key={booking._id}>
            <div className="card-body text-left">
              <h5 className="card-title">{booking.room}</h5>
              <br />
              <p className="card-text">
                <b>Booking ID    :</b>{booking._id}
              </p>
              <p className="card-text">
                <b>Check-in      :</b> {booking.fromdate}
              </p>
              <p className="card-text">
                <b>Check-out     :</b> {booking.todate}
              </p>
              <p className="card-text">
                <b>Total Amount  : </b>
                {booking.totalamount}
              </p>
              <p className="card-text">
                <b>Status        : </b>
                {booking.status == "booked" ? <Tag color="green">Confirmed</Tag> :<Tag color="orange">cancelled</Tag>}
              </p>
              {booking.status != "cancelled" && (
                <div className="text-right">
                  <button
                    className="btn text-light"
                    onClick={() => {
                      cancelBooking(booking._id, booking.roomid);
                    }}
                  >
                    cancel Booking
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
