import React, { Component } from 'react'
import './Table.css'
import TableRow from './TableRow'

export default class Table extends Component {

  state = {
    tableHeader: ['id', 'date', 'name', 'quantity', 'distance'],
    tableContents: [
      {
        id: 1,
        date: '2020-05-09',
        name: 'John',
        quantity: 11,
        distance: 5
      },
      {
        id: 2,
        date: '2020-05-08',
        name: 'Sam',
        quantity: 9,
        distance: 4
      },
      {
        id: 3,
        date: '2020-05-07',
        name: 'Mike',
        quantity: 13,
        distance: 8
      },
      {
        id: 4,
        date: '2020-05-06',
        name: 'Sarah',
        quantity: 12,
        distance: 3
      },
    ]
  }

  clickHandler = (column) => {
    console.log(column);
    
  }
    render() {
        return (
            <div className='Table'>
              <table>
                <tbody>
                  <tr>
                    {this.state.tableHeader.map(column => {
                      return (
                        <th 
                          key={column} 
                          onClick={() => this.clickHandler(column)}
                        >{column.toUpperCase()}
                        </th>
                      )
                      })}
                  </tr>

                  {this.state.tableContents.map((row, id) => {
                    return <TableRow key={row.id} {...row} id={id + 1}/>
                  })}

                </tbody>
              </table>
            </div>
        )
    }
}