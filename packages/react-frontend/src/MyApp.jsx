// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

const BACKEND_URL = "http://localhost:8000";

function MyApp() {

  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); })
  }, []);

  function removeOneCharacter(index) {
    const deleteID = characters.filter((character, i) => {
      return i === index;
    })[0].id;
    deleteUser(deleteID)
      .then(() => {
        const updated = characters.filter(character => character.id !== deleteID);
        setCharacters(updated);
    })
      .catch((error) => {console.log(error)});
  }

  function updateList(person) {
    postUser(person)
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        }
        else throw new Error("Backend threw a successful status code but not a 201 when creating a user");
      })
      .then((userJson) => setCharacters([...characters, userJson]))
      .catch((error) => console.log(error));
  }

  function fetchUsers() {
    const promise = fetch(`${BACKEND_URL}/users`);
    return promise;
  }

  function postUser(person) {
    const promise = fetch(`${BACKEND_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person)
    });
    return promise;
  }

  function deleteUser(id) {
    const promise = fetch(`${BACKEND_URL}/users/${id}`, { method: "DELETE" });
    return promise;
  }


  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp; // makes the MyApp function available to other components or files
