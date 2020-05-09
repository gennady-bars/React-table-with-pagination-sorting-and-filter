import React from 'react'

const TableRow = ({date, name, quantity, distance}) => {
    return (
            <tr>
              <td>{date}</td>
              <td>{name}</td>
              <td>{quantity}</td>
              <td>{distance}</td>
            </tr>
    )
}

export default TableRow;