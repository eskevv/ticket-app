'use effect'
import EditTicketForm from "@/app/(components)/EditTicketForm";

const getTicketById = (id) => {
  return fetch(`http://localhost:3000/api/Tickets/${id}`, {
    cache: "no-store",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch topic");
      }
      return res.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

let updateTicketData = {};
const TicketPage = ({ params }) => {
  const EDITMODE = params.id === "new" ? false : true;

  if (EDITMODE) {
    getTicketById(params.id)
      .then((data) => {
        updateTicketData = data.foundTicket;
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    updateTicketData = {
      _id: "new",
    };
  }

  return <EditTicketForm ticket={updateTicketData} />;
};

export default TicketPage;
