import { useEffect,useState } from "react";
import { getList } from "../../api/productsApi";
import useCustomMove from "../../hooks/useCustomMove";
import PageComponent from "../common/PageComponent";

const initState = {
    dtoList:[],
    pageNumList:[],
    pageRequestDTO:null,
    prev:false,
    next:false,
    totalCount:0,
    prevPage:0,
    nextPage:0,
    totalPage:0,
    current:0
}

const ListComponent = () =>{
    const {page,size,moveToList,moveToRead} = useCustomMove()

    const [serverData, setServerData] = useState(initState)

    useEffect(()=>{
        getList({page,size}).then(data=>{
            console.log(data)
            setServerData(data)
        })

    },[page,size])

    return(
         <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
            <div className="flex flex-wrap mx-auto justify-center p-6">
                {serverData.dtoList.map(product =>
                    <div key={product.pno} className="w-full min-w-[400px] p-2 m-2 rounded shadow-md" onClick={()=>moveToRead(product.pno)}>
                        <div className="flex">
                            <div className="font-extrabold text-2xl p-2 w-1/12">{product.pno}</div>
                            <div className="text-1xl m-1 p-2 w-8/12 font-extrabold">{product.pname}</div>
                        </div>
                    </div>
                )}
            </div>
            <PageComponent serverData={serverData} movePage={moveToList}></PageComponent>
            </div>
    )
}

export default ListComponent;