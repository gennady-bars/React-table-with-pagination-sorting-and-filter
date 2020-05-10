import React from 'react'

const TablePagination = props => {
  const pages = [...Array(props.pagesTotal).keys()]
  let from = Math.max(0, props.currentPage - 3)
  let to = Math.min(props.pagesTotal, props.currentPage + 4)
  if (from === 0) to = Math.min(props.pagesTotal, 7);
  if (to === props.pagesTotal) from = Math.max(0, props.pagesTotal - 7)

  if (pages.length === 0) {
    return <h2>Ничего не найдено</h2>
  }
  
    return (
      <nav aria-label="...">
        <ul className="pagination">
          <li className={"page-item" + (props.currentPage === 0? ' disabled': '')}>
            <a 
              onClick={props.onPreviousPageClickHandler}
              className="page-link" 
              href="/">Назад</a>
          </li>

          {
            pages.map(page => {
              return (
                <li key={page} className={"page-item" + (props.currentPage === page? ' active': '')}>
                  <a 
                    onClick={(event) => props.onPageClickHandler(event, page)} 
                    className={"page-link"} 
                    href={`/page/${page + 1}`}
                  >{page + 1}</a>
                </li>
              )
            }).slice(from, to)
          }

          {/* <li className="page-item"><a className="page-link" href="/1">1</a></li>
          <li className="page-item active" aria-current="page">
            <a className="page-link" href="/2">2 <span className="sr-only">(current)</span></a>
          </li>
          <li className="page-item"><a className="page-link" href="/3">3</a></li> */}

          <li className={"page-item" + (props.currentPage === props.pagesTotal - 1? ' disabled': '')} >
            <a 
              onClick={props.onNextPageClickHandler}
              className="page-link" 
              href="/">Вперед</a>
          </li>
        </ul>
      </nav>
    )
}

export default TablePagination;