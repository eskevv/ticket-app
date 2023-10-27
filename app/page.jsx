'use client'

import React, {useEffect, useState} from "react";
import TicketCard from "./(components)/TicketCard";

const Dashboard = () => {
  const [{tickets}, setTickets] = useState([]);
  useEffect(() => {
    fetch("/api/Tickets", {cache: "no-store",})
      .then(res => res.json())
      .then(data => setTickets(data))
      .catch((error) => {
        console.log(`Error loading topics: ${error}`);
      });
  }, []);

  const uniqueCategories = [...new Set(tickets?.map(({category}) => category))];

  return (
    <div className="p-5">
      <div>
        {tickets &&
          uniqueCategories?.map((uniqueCategory, categoryIndex) => (
            <div key={categoryIndex} className="mb-4">
              <h2>{uniqueCategory}</h2>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4 ">
                {tickets
                  .filter((ticket) => ticket.category === uniqueCategory)
                  .map((filteredTicket, _index) => (
                    <TicketCard id={_index} key={_index} ticket={filteredTicket}/>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
