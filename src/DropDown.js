import React, { useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";

const GET_DATA = gql`
  query GetData {
    getCoaches {
      name
    }
    getTeams {
      name
    }
  }
`;

const DropdownComponent = () => {
  const [selectedOption, setSelectedOption] = useState("");
  localStorage.setItem(
    "token",
    JSON.stringify(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    )
  );
  let getToken = localStorage.getItem("token");
  getToken = getToken ? JSON.parse(getToken) : "";
  console.log(getToken);

  const [getData, { loading, error, data }] = useLazyQuery(GET_DATA, {
    onCompleted: (receivedData) => {
      console.log("Query completed, received data:", receivedData);
    },
    context: {
      headers: {
        Authorization: getToken ? `Bearer ${getToken}` : `Bearer `,
      },
    },
    onError: (error) => {
      console.log("Query Failed", error);
    },
  });

  const handleButtonClick = async () => {
    await getData();
  };

  const options = ["coaches", "teams"];

  return (
    <div>
      <select
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <button onClick={handleButtonClick}>Submit</button>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      {data ? (
        <ul>
          {selectedOption === "coaches" && data.getCoaches
            ? data.getCoaches.map((coach) => (
                <li key={coach.name}> {coach.name}</li>
              ))
            : null}
          {selectedOption === "teams" && data.getTeams
            ? data.getTeams.map((team) => <li key={team.name}> {team.name}</li>)
            : null}
        </ul>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default DropdownComponent;
