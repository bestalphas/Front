import { useEffect,useState } from "react";
import { getOne,putOne,deleteOne} from "../../api/productsApi";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";

const initState = {
    pno:0,
    pname:'',
    price:'',
    delFlag:false
}

const ModifyComponent = ({pno}) =>{
    
    const[product,setTodo] = useState({...initState})
    
    const[result,setResult] = useState(null)

    const { moveToList, moveToRead } = useCustomMove()
    useEffect(()=>{
        getOne(pno).then(data =>{
            setTodo(data)
        })
    },[pno])
    
    const handleClickModify = () =>{
        putOne(product).then(data=>{
            console.log("수정결과" + data)
            setResult('Modified')
        })
    }

    const handleClickDelete=()=>{
        deleteOne(pno).then(data=>{
            console.log("삭제 결과: " + data)
            setResult('삭제성공')
        })
    }

    const closeModal = () =>{
        if(result ==='삭제성공'){
            moveToList()
        }else{
            moveToRead(pno)
        }
    }


    const handleChangeTodo =(e) =>{
        product[e.target.name]=e.target.value

        setTodo({...product})
    }

    const handleChangeTodoComplete = (e) =>{
        const value = e.target.value
        product.delFlag = (value ==='Y')
        setTodo({...product})
    }
    
    return(
        
        <div className="border-2 border-sky-200 mt-2 m-2 p-4">
            
            {result ? <ResultModal title={'처리결과'} content={result} callbackFn={closeModal}></ResultModal> : <></>}
            
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">번호</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md bg-gray-100">{product.pno}</div>
                    </div>
            </div>

            <div className="flex justify-center">n
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">상품이름</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md bg-gray-100">{product.pname}</div>
                    </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">가격</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" name="title" type={'text'} value={product.price} onChange={handleChangeTodo}></input>
                    </div>
            </div>       
                    
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">완료여부</div>
                    <select name="status" className="border-solid border-2 rounded m-1 p-2" onChange={handleChangeTodoComplete} value={product.delFlag? 'Y':'N'}>
                        <option value='Y'>완료</option>
                        <option value='N'>수정중</option>
                    </select>
                </div>
            </div>
                
                    
        
        <div className="flex justify-end p-4">
        <button type="button" className="rounded p-4 w-36 bg-red-500 text-xl text-white" onClick={handleClickDelete}>삭제</button>
        <button type="button" className="rounded p-4 w-36 bg-blue-500 text-xl text-white" onClick={handleClickModify}>수정</button>
        </div>
        
        </div>
        
    )
}

export default ModifyComponent;