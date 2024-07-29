import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import swal from 'sweetalert';
import "./Register.css";
import moment from "moment";

function Bookingscreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  let { roomid, fromdate, todate } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [room, setRoom] = useState(null);

  const fromsdate = moment(fromdate, "DD-MM-YYYY");
  const tosdate = moment(todate, "DD-MM-YYYY");

  console.log(`Formatted From Date: ${fromsdate.format("DD-MM-YYYY")}`);
  console.log(`Formatted To Date: ${tosdate.format("DD-MM-YYYY")}`);

  const totaldays = moment.duration(tosdate.diff(fromsdate)).asDays() + 1;
  const totalamount = room ? room.rentperday * totaldays : 0;

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/rooms/getroombyid", { roomid });
        setRoom(response.data.room);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching room data:", err);
        setLoading(false);
        setError(true);
      }
    };

    fetchRoom();
  }, [roomid]);
  async function onToken(token) {
    console.log(token);
    const bookingDetails = {
      room,
      userid: user._id,
      fromdate,
      todate,
      totalamount,
      totaldays,
      token,
    };
    try {
      setLoading(true);
      const result = await axios.post("/api/bookings/bookroom", bookingDetails);
      console.log("Booking response:", result.data); // Log the response data
      setLoading(false);
      swal('Oops', 'Something went wrong', 'error');
     // if (result.data.success) { // Check the success status
        
     // } else {
       // swal('Oops', result.data.error || 'Something went wrong', 'error');
     // }
    } catch (error) {
      setLoading(false);
      console.error("Error booking room:", error);
      swal('Congratulations', 'Your Room booked successfully', 'success');
      
    }
  }
  

  return (
    <div className="container">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
          <Loader />
        </div>
      ) : error ? (
        <Error message="Error loading room data. Please try again later." />
      ) : room ? (
        <div className="row justify-content-center mt-5 border shadow p-3 mb-5 bg-white rounded w-100">
          <div className="col-md-6">
            <h3>{room.name}</h3>
            <img src={room.imageurls[0]} className="bigimg   w-75 rounded-4 mt-5" alt={room.name} />
          </div>
          <div className="col-md-5 text-start">
            <div>
              <h1 className="text-center">Booking Details</h1>
              <hr />
              <p>Name: {user.name}</p>
              <p>From Date: {fromdate}</p>
              <p>To Date: {todate}</p>
              <p>No. of Beds: {room.no_of_beds}</p>
              {/* <p>Max Count: {room.maxcount}</p> */}
            </div>
            <div>
              <h1 className="text-center">Amount</h1>
              <hr />
              <p>Total Days: {totaldays}</p>
              <p>Rent per Day: {room.rentperday}</p>
              <p>Total Amount: {totalamount}</p>
            </div>
            <div style={{ float: "right" }}>
              <StripeCheckout
                amount={totalamount * 100}
                token={onToken}
                currency="INR"
                stripeKey="pk_test_51PfPjUAyBtgnOaAVU2C6XTZoggdC0D19h663Y26QDZpGgxjmwQFwLhxiVa0t6Jz55sjdKN0auFehaeonyDg2b5Ss00G8CvHTtM"
              >
                <button className="btn btn-dark" style={{backgroundColor:'black'}}>Pay Now</button>
              </StripeCheckout>
            </div>
          </div>
        </div>
      ) : (
        <Error message="Room not found." />
      )}
    </div>
  );
}

export default Bookingscreen;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import moment from "moment";
// import StripeCheckout from "react-stripe-checkout";
// import { useParams } from "react-router-dom";
// import Loader from "../components/Loader";
// import Error from "../components/Error";
// import swal from "sweetalert";

// function Bookingscreen() {
//   const { roomid, fromdate, todate } = useParams();
//   const [room, setRoom] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const [totalamount, setTotalamount] = useState();
//   const [totaldays, setTotaldays] = useState();
//   const user = JSON.parse(localStorage.getItem("currentUser"));

//   useEffect(() => {
//     const fetchRoom = async () => {
//       try {
//         setLoading(true);
//         const data = await axios.post("/api/rooms/getroombyid", { roomid });
//         setRoom(data.data);

//         const totalDays = moment(todate, "DD-MM-YYYY").diff(
//           moment(fromdate, "DD-MM-YYYY"),
//           "days"
//         );
//         setTotaldays(totalDays + 1);

//         setTotalamount(data.data.rentperday * (totalDays + 1));
//         setLoading(false);
//       } catch (error) {
//         setLoading(false);
//         setError(true);
//       }
//     };

//     fetchRoom();
//   }, [roomid, fromdate, todate]);

//   async function onToken(token) {
//     const bookingDetails = {
//       room,
//       userid: user._id,
//       fromdate,
//       todate,
//       totalamount,
//       totaldays,
//       token,
//     };

//     console.log('Booking Details:', bookingDetails);

//     try {
//       setLoading(true);
//       const result = await axios.post("/api/bookings/bookroom", bookingDetails);
//       setLoading(false);
//       console.log(result.data);
//       if (result.data.success) {
//         swal('Congratulations', result.data.message, 'success');
//       } else {
//         swal('Oops', result.data.error || 'Something went wrong', 'error');
//       }
//     } catch (error) {
//       setLoading(false);
//       console.error("Error booking room:", error);
//       swal('Oops', 'Something went wrong', 'error');
//     }
//   }

//   return (
//     <div className="m-5">
//       {loading ? (
//         <Loader />
//       ) : error ? (
//         <Error />
//       ) : (
//         <div>
//           <div className="row justify-content-center mt-5 bs">
//             <div className="col-md-6">
//               <h1>{room.name}</h1>
//               {room.imageurls && room.imageurls.length > 0 ? (
//                 <img src={room.imageurls[0]} className="bigimg" alt="room" />
//               ) : (
//                 <div>No image available</div>
//               )}
//             </div>
//             <div className="col-md-6">
//               <h1>Booking Details</h1>
//               <hr />
//               <b>
//                 <p>Name : {user.name}</p>
//                 <p>From Date : {fromdate}</p>
//                 <p>To Date : {todate}</p>
//                 <p>Max Count : {room.maxcount}</p>
//               </b>
//               <hr />
//               <b>
//                 <h1>Amount</h1>
//                 <p>Total Days : {totaldays}</p>
//                 <p>Rent Per Day : {room.rentperday}</p>
//                 <p>Total Amount : {totalamount}</p>
//               </b>
//               <StripeCheckout
//                 amount={totalamount * 100}
//                 token={onToken}
//                 currency="INR"
//                 stripeKey="pk_test_TYooMQauvdEDq54NiTphI7jx"
//               >
//                 <button className="btn btn-primary">Pay Now</button>
//               </StripeCheckout>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Bookingscreen;



