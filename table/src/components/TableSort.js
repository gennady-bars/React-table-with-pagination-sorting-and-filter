import React from 'react'

const TableSort = (props) => {
    return (
      <React.Fragment>
        <div className="input-group mb-3 mt-3">
          <select onChange={(e) => props.onColumnChange(e.target.value)}  className="custom-select">
            <option value=''>Выберите колонку...</option>
            <option value="name">Name</option>
            <option value="quantity">Quantity</option>
            <option value="distance">Distance</option>
          </select>
          <select onChange={(e) => props.onConditionChange(e.target.value)} className="custom-select">
            <option value=''>Выберите условие...</option>
            <option value="equals">равно</option>
            <option value="contains">содержит</option>
            <option value="more">больше</option>
            <option value="less">меньше</option>
          </select>
        </div>
        <div className="input-group mb-3">
       
          <input 
            onChange={(e) => props.onInputChange(e.target.value)}
            type="text" 
            className="form-control" 
            placeholder={props.inputDisabled? 'Для фильтра выберите колонку и условие' : 'Введите значение для фильтра...'}
            disabled={props.inputDisabled}
          ></input>
        </div>
        <p>Выберите все поля для фильтрации и укажите значение</p>
        
      </React.Fragment>
    )
}

export default TableSort;