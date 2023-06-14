import React, { useEffect, useState } from 'react'
import search from '../../Images/search.svg';
import { useAppContext } from '../../contexts/ContextProvider';
import { getVendorSpecificProposals } from '../../utils/utils.api';
import EachProposal from './EachProposal';
import Createproposal from './Createproposal';
function VendorProposals() {
  const { userDetails } = useAppContext();
  const [proposals, setProposals] = useState([]);
  const [createPage, setCreatePage] = useState(false);
  const [edit , setEdit] = useState("");
  useEffect(() => {
    getVendorSpecificProposals(userDetails.user._id, userDetails.token).then(res => {
      setProposals(res.data.reverse());
    })
  }, [])
  return <div className='proposalsHolder'>
    <span>Proposals</span>
    <img src={search} alt='Search' />
    <input placeholder='Search Projects' />
    <button onClick={() => (
      setCreatePage(true)
    )}>
      CREATE
    </button>
    <div>
      {
        proposals.length === 0 ? <div>No Proposals to Show</div> :
          proposals.map((data) => (
            <EachProposal setEdit ={setEdit} setCreatePage={setCreatePage} vendorProposals={data} key={data._id} onDeleteFunc={(id) => {
              setProposals(proposals => proposals.filter(data => data._id !== id))
            }}
            />
          ))
      }
    </div>
    {createPage ? <Createproposal edit={edit} setEdit = {setEdit} setProposals = {setProposals} proposals = {proposals} setCreate={setCreatePage} /> : ""}
  </div>
}

export default VendorProposals