import React from "react";
import President from "./President";
import './President.css';

function PresidentList(props) {
  return (
    <div>
        <table className="table table-striped" id="mainTable">
          <thead className='thead-dark'>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Birthdate</th>
              <th scope="col">Birthplace</th>
              <th scope="col">Deathdate</th>
              <th scope="col">Deathplace</th>
            </tr>
          </thead>
          <tbody>
            {props.presidents.map(p => <President 
                key={p.presidentId}
                name={p.name}
                birthdate={p.birthdate}
                birthplace={p.birthplace}
                deathdate={p.deathdate}
                deathplace={p.deathplace}
                />)}
          </tbody>
        </table>
    </div>
  );
}

export default PresidentList;