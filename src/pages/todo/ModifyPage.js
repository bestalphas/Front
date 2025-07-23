import { useNavigate } from "react-router-dom";

const ModifyPage = ({tno}) =>{
    
    const navigate = useNavigate()

    const moveToRead = () =>{
        navigate({
            pathname:`/todo/read/${tno}`
        })
    }
    
    const moveToList = () => {
        navigate({
            pathname:`/todo/list`
        })
    }

    return(
        
        <div className="text-3xl font-extrabold">
            Todo Modify Page
            <button onClick={()=>moveToRead(tno)}>조회로 이동</button>
            <button onClick={()=>moveToList()}>목록으로 이동</button>
        </div>
    )
    

}

export default ModifyPage;