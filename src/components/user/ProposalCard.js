import { useNavigate } from "react-router";


export default function ProposalCard({data}){
    const navigate = useNavigate();
    return <div className="ProposalCard"
        onClick={() =>{
            navigate(`${data._id}`)
        }}
    >
        <img src={data.images[0]}/>
        <div>{data.VendorId.name}</div>
        <div>{data.budget}</div>
        <div>{data.eventPlace}/-</div>
    </div>
}