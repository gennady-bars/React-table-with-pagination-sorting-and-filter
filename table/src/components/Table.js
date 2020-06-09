import React, { Component } from 'react'
import TableRow from './TableRow'
import TableSort from './TableSort';
import TableHeader from './TableHeader';
import TablePagination from './TablePagination';
import { makeData } from '../makeRandomData';

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
    pages: {
      devidedIntoPages: [],
      currentPage: 0,
      step: 10
    },
    filterValues: {
      column: '',
      condition: '',
      input: '',
    },
    tableHeader: ['date', 'name', 'quantity', 'distance'],
    tableContents: []
  }

  async componentDidMount() {
    // асинхронно делаем запрос в базу данных
    // Если используем Redux, то это делаем через Thunk
    // и устанавливаем наш state
    const tableContents = makeData(103)

    this.setState({
      tableContents,
    })
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
      tableContents: contents,
      pages: {
        ...this.state.pages, currentPage: 0
      },
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
      },
      pages: {
        ...this.state.pages, currentPage: 0
      },
    })
    
  }

  tableFilterHandler = () => {
    
    this.setState({
      isFiltered: true
    })
  }

  onPageClickHandler = (event, currentPage) => {
    event.preventDefault()
    this.setState({
      pages: {
        ...this.state.pages, currentPage
      }
    })
  }
  
  onPreviousPageClickHandler = (event) => {
    event.preventDefault()
    this.setState({
      pages: {
        ...this.state.pages, currentPage: this.state.pages.currentPage - 1
      }
    })
  }

  onNextPageClickHandler = (event) => {
    event.preventDefault()
    this.setState({
      pages: {
        ...this.state.pages, currentPage: this.state.pages.currentPage + 1
      }
    })
  }


    render() {
      // console.log(this.state);
      
      const {column, condition, input} = this.state.filterValues
      const {currentPage, step} = this.state.pages
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
                inputDisabled={!(column && condition)}
              />

              <TablePagination
                currentPage={currentPage}
                pagesTotal={Math.ceil(tableContents.length / step)}
                onPageClickHandler={this.onPageClickHandler}
                onPreviousPageClickHandler={this.onPreviousPageClickHandler}
                onNextPageClickHandler={this.onNextPageClickHandler}
              />
              
              <table className='table table-striped'>
                <tbody>
                  <TableHeader
                    tableHeader={this.state.tableHeader}
                    sortTable={this.sortTable}
                  />
                    {
                      tableContents.slice(currentPage * step, currentPage * step + step).map((rowProps) => {
                        return <TableRow key={rowProps.id} {...rowProps}/>
                      })
                    }
                </tbody>
              </table>

              <TablePagination
                currentPage={currentPage}
                pagesTotal={Math.ceil(tableContents.length / step)}
                onPageClickHandler={this.onPageClickHandler}
                onPreviousPageClickHandler={this.onPreviousPageClickHandler}
                onNextPageClickHandler={this.onNextPageClickHandler}
              />

            </React.Fragment>
        )
    }
}
