import React from 'react'

const TableHeader = props => {
    return (
      <tr>
      {
        props.tableHeader.map(column => {
        return (
          <th 
            style={{'cursor': 'pointer'}}
            scope="col" 
            key={column}
            onClick={() => props.sortTable(column)}
          >{column.toUpperCase()}
          </th>
          )
        })
      }
    </tr>
    )
}

export default TableHeader;