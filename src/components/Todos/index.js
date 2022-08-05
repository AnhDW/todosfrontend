import React,{useEffect, useState} from 'react'
import {getTodosApi} from '../../api/todos'
import "./index.css"

const Todos = ()=>{

    const [todos,setTodos] = useState([])

    useEffect(()=>{
        fetchData()
    },[])

    const fetchData = async ()=>{
        setTodos(await getTodosApi())
    }

    return (
    <main id="todolist">
      <h1>
        Danh sách
        <span>Việc hôm nay không để ngày mai.</span>
      </h1>
      <>
        {todos?.map((item, key) => (
          <li className={item.isComplete ? "done" : ""} key={key}>
            <span className="label">{item.name}</span>
            <div className="actions">
              <button className="btn-picto" type="button">
                <i className="fas fa-edit" />
              </button>
              <button
                className="btn-picto"
                type="button"
                aria-label="Delete"
                title="Delete"
              >
                <i className="fas fa-trash" />
              </button>
            </div>
          </li>
        ))}
      </>

      {/* <li className="done">
  <span className="label">123</span>
  <div className="actions">
      <button className="btn-picto" type="button">
      <i className="fas fa-edit" />
      </button>
      <button className="btn-picto" type="button" aria-label="Delete" title="Delete">
      <i className="fas fa-trash" />
      </button>
  </div>
  </li>
  <li>
  <span className="label">123</span>
  <div className="actions">
      <button className="btn-picto" type="button">
      <i className="fas fa-user-edit" />
      </button>
      <button className="btn-picto" type="button" aria-label="Delete" title="Delete">
      <i className="fas fa-trash" />
      </button>
  </div>
  </li> */}
      <p>Danh sách nhiệm vụ trống.</p>
      <form>
        <label>Thêm nhiệm vụ mới</label>
        <input type="text" name="name" id="name" />
        <input type="text" name="id" id="name" />
        <button type="button">Thêm mới</button>
      </form>
    </main>
  );
}

export default Todos