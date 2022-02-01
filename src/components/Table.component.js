import React, { useState } from "react";

import useTable from "./usetable.component";
import styles from "./component.css";
import TableFooter from "./tablefooter";
import delet from "../delete-64.png";
import edit from "../edit-64.png";
import "./students.css";

const Table = ({ data, rowsPerPage }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  return (
    <>
      <table className={styles.table}>
        <thead className={styles.tableRowHeader}>
          <tr>
          <th className={styles.tableHeader}>N° Appogee</th>
            <th className={styles.tableHeader}>Nom</th>
            <th className={styles.tableHeader}>Prenom</th>
            <th className={styles.tableHeader}>Date de Naissance</th>
            <th className={styles.tableHeader}>Email</th>
            <th className={styles.tableHeader}>Filiere</th>
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
              <td className={styles.tableCell}><a href={"../note/"+el.id}><img className="icn" alt="" src={edit}></img></a></td>
              <td className={styles.tableCell}><a href={"../absence/"+el.id}><img className="icn" alt="" src={edit}></img></a></td>
              
            </tr>
          ))}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default Table;