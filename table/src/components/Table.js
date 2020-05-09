import React, { Component } from 'react'
import TableRow from './TableRow'
import TableSort from './TableSort';
import TableHeader from './TableHeader';

function filterTable(tableContents, column, condition, input) {
  const filteredTable = tableContents.filter(row => {
    let keepIt = true;
    let isValid = false;
    let regEx = new RegExp(`${input}`, 'i')
    
    if (column && condition && input) {
      if (column === 'name') {
        if (condition === 'equals') {
          keepIt = input.toLowerCase() === row[column].toLowerCase()
        }
        if (condition === 'contains') {
          keepIt = regEx.test(row[column])
        }
      } else {
        let number = Number(input)
        isValid = !isNaN(number);
        if (isValid) {
          if (condition === 'equals') {
            keepIt = number === row[column]
          }
          if (condition === 'contains') {
            keepIt = regEx.test(`${row[column]}`)
          }
          if (condition === 'more') {
            keepIt = row[column] > number
          }
          if (condition === 'less') {
            keepIt = row[column] < number
          }
        }
      }
    }
    return keepIt
  })

  return filteredTable;
}

export default class Table extends Component {

  state = {
    isFiltered: false,
    filterValues: {
      column: '',
      condition: '',
      input: '',
    },
    tableHeader: ['date', 'name', 'quantity', 'distance'],
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
        quantity: 15,
        distance: 9
      },
      {
        id: 5,
        date: '2020-05-01',
        name: 'George',
        quantity: 19,
        distance: 10
      },
      {
        id: 6,
        date: '2020-05-03',
        name: 'Bill',
        quantity: 1,
        distance: 1
      },
      {
        id: 7,
        date: '2020-05-02',
        name: 'Bob',
        quantity: 3,
        distance: 2
      },
      {
        id: 8,
        date: '2020-05-10',
        name: 'Fiona',
        quantity: 13,
        distance: 9
      },
    ]
  }

  async componentDidMount() {
    // асинхронно делаем запрос в базу данных
    // и устанавливаем наш state
  }

  sortTable = (column) => {
    if (column === 'id' || column === 'date') return;
    const contents = [...this.state.tableContents].sort((a, b) => {
      if (column === 'name') {
        if(a.name[0] < b.name[0]) return -1;
        if(a.name[0] > b.name[0]) return 1;
        return 0;
      }
      return a[column] - b[column];
    })
    this.setState({
      tableContents: contents
    })
  }

  onColumnChange = (column) => {
    this.setState({
      isFiltered: true,
      filterValues: {
        ...this.state.filterValues, column
      }
    })
  }

  onConditionChange = (condition) => {
    this.setState({
      isFiltered: true,
      filterValues: {
        ...this.state.filterValues, condition
      }
    })
  }

  onInputChange = (input) => {
    this.setState({
      isFiltered: true,
      filterValues: {
        ...this.state.filterValues, input
      }
    })
    
  }

  tableFilterHandler = () => {
    this.setState({
      isFiltered: true
    })
  }
    render() {
      const {column, condition, input} = this.state.filterValues
      let tableContents = this.state.tableContents
      if (this.state.isFiltered) {
        tableContents = filterTable(tableContents, column, condition, input)
      }
        return (
            <React.Fragment>

              <TableSort
                onColumnChange={this.onColumnChange}
                onConditionChange={this.onConditionChange}
                onInputChange={this.onInputChange}
                tableFilter={this.tableFilterHandler}
              />
              

              <table className='table table-striped'>
                <tbody>
                  <TableHeader
                    tableHeader={this.state.tableHeader}
                    sortTable={this.sortTable}
                  />
                    {
                      tableContents.map((rowProps) => {
                        return <TableRow key={rowProps.id} {...rowProps}/>
                      })
                    }
                </tbody>
              </table>
            </React.Fragment>
        )
    }
}