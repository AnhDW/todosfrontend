import React,{useEffect} from 'react'
import {getTodosApi,delTodoApi,addTodoApi,editTodoApi} from '../../api/todos'
import "./index.css"

const Todos = ()=>{

    const [todos,setTodos] = React.useState([])
    const [textBtn,setTextBtn] = React.useState("THÊM MỚI")
    const todoRef = React.useRef([])
    useEffect(()=>{
        fetchData()
    },[])

    const fetchData = async ()=>{
        setTodos(await getTodosApi())
    }

    const delTodo = async (id)=>{
      if(window.confirm("Are you sure?")){
        await delTodoApi(id)
        fetchData()
      }
    }
    const addOrEditTodo = async (event)=>{
        event.preventDefault()
        const val = event.target[0].value
        const id = event.target[1].value
        
        if(id){
          await editTodoApi({
            name:val,
            id:id
          })
          todoRef.current[id].className = 'fas fa-edit'
        }else{
          await addTodoApi({
            name:val
          })
        }
        fetchData()
        event.target[0].value = ''
        event.target[1].value = null
        setTextBtn("THÊM MỚI")
    }

    const editTodo = (id)=>{

      todoRef?.current.forEach(item=>{
        if(item.getAttribute('data-id') !==String(id)){
          item.className = "fas fa-edit"
        }
      })

      const inputName = document.getElementById('name')
      const inputId = document.getElementById('id')
      if(todoRef?.current[id].className === 'fas fa-edit'){
        todoRef.current[id].className = 'fas fa-user-edit'
        inputName.value = todoRef.current[id].getAttribute('data-name')
        inputId.value = id
        setTextBtn("CẬP NHẬT")
      }else{
        todoRef.current[id].className = 'fas fa-edit'
        inputName.value = ""
        inputId.value = ""
        setTextBtn("THÊM MỚI")
      }
      console.log();
    }

    const onIsCompleteTodo = async (todo)=>{
      await editTodoApi({
        ...todo,
        isComplete:true
      })
      fetchData()
    }
    return (
    <main id="todolist">
      <h1>
        Danh sách
        <span>Việc hôm nay không để ngày mai.</span>
      </h1>
        {
        todos?
        (
          todos?.map((item, key) => (
            <li className={item.isComplete ? "done" : ""} key={key} onDoubleClick={()=>onIsCompleteTodo(item)}>
              <span className="label">{item.name}</span>
              <div className="actions">
                <button 
                className="btn-picto" 
                type="button"
                onClick={()=>editTodo(item.id)}
                >
                  <i 
                  className="fas fa-edit" 
                  ref={el=>todoRef.current[item.id]=el}
                  data-name={item.name}
                  data-id={item.id}
                  />
                </button>
                <button
                  className="btn-picto"
                  type="button"
                  aria-label="Delete"
                  title="Delete"
                  onClick={()=>delTodo(item.id)}
                >
                  <i 
                    className="fas fa-trash"
                  />
                </button>
              </div>
            </li>
          ))
        ):(<p>Danh sách nhiệm vụ trống.</p>)
        }
      <form onSubmit={addOrEditTodo}>
        
        <input type="text" name="name" id="name" />
        <input type="text" name="id" id="id" style={{display:'none'}}  />
        <button type="submit">{textBtn}</button>
      </form>
    </main>
  );
}

export default Todos