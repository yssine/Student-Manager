import React, { useState } from "react";

import useTable from "./usetable.component";
import styles from "./component.css";
import TableFooter from "./tablefooter";
import delet from "../delete-64.png";
import edit from "../edit-64.png";
import grade from "../grade.png";
import abs from "../abs.png";
import "./students.css";

const Table = ({ data, rowsPerPage }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  return (
    <>
      <table className={styles.table}>
        <thead className={styles.tableRowHeader}>
          <tr>
            <th className="n" >N° Appogee</th>
            <th className="lst" >Nom</th>
            <th className="st" >Prenom</th>
            <th className="bday" >Date de Naissance</th>
            <th className="mail" >Email</th>
            <th className="fil" >Filiere</th>
            <th className={styles.tableHeader}></th>
            <th className={styles.tableHeader}></th>
            <th className={styles.tableHeader}></th>
            <th className={styles.tableHeader}></th>
          </tr>
        </thead>
        <tbody>
          {slice.map((el) => (
            <tr className={styles.tableRowItems} key={el.id}>
              <td className={styles.tableCell}>{el.id}</td>
              <td className={styles.tableCell}>{el.firstname}</td>
              <td className={styles.tableCell}>{el.lastname}</td>
              <td className={styles.tableCell}>{el.birthday}</td>
              <td className={styles.tableCell}>{el.email}</td>
              <td className={styles.tableCell}>{el.filiere.filierename}</td>
              <td className={styles.tableCell}><a href={"../update/"+el.id}><img className="icn" alt="" src={edit}></img></a></td>
              <td className={styles.tableCell}><a href={"../deletestudent/"+el.id}><img className="icn" alt="" src={delet}></img></a></td>
              <td className={styles.tableCell}><a href={"../note/"+el.id}><img className="icn" alt="" src={grade}></img></a></td>
              <td className={styles.tableCell}><a href={"../absence/"+el.id}><img className="icn" alt="" src={abs}></img></a></td>
              
            </tr>
          ))}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default Table;