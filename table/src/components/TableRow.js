import React from 'react'

const TableRow = ({id, date, name, quantity, distance}) => {
    return (
            <tr>
              <th>{id}</th>
              <td>{date}</td>
              <td>{name}</td>
              <td>{quantity}</td>
              <td>{distance}</td>
            </tr>
    )
}

export default TableRow;