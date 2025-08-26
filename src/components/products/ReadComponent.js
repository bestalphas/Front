import { useEffect,useState } from "react";
import { getOne } from "../../api/productsApi";
import useCustomMove from "../../hooks/useCustomMove";

const initState = {
    pno:0,
    pname:'',
    price:'',
    dueDate:null,
    delFlag:false
}

const ReadComponent = ({pno}) => {
    
    const [product, setTodo] = useState(initState)
    
    const {moveToList,moveToModify} = useCustomMove()

    useEffect(()=>{
        getOne(pno).then(data =>{
            console.log(data)
            setTodo(data)
        })
    },[pno])
    
    
    return(
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            {makeDiv('번호',product.pno)}
            {makeDiv("상품이름",product.pname)}
            {makeDiv("가격",product.price)}
            {makeDiv("수정",product.delFlag ? '수정':"아니요")}
            
 


            <div className="flex justify-end p-4">
                <button type="button" className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500" onClick={()=> moveToList()}>List</button>
                <button type="button" className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500" onClick={()=> moveToModify(pno)}>Modify</button>
            </div>
        </div>
    )
}

const makeDiv = (pname,value) =>
    <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-1/5 p-6 text-right font-bold">{pname}</div>
            <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{value}</div>
        </div>
    </div>
export default ReadComponent;