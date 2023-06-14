import React, { useEffect, useState } from 'react'
import partyImage from '../../Images/private-party-venues@2x.png'
import { getAllProposals, getUserSelectedProposals } from '../../utils/utils.api';
import ProposalCard from './ProposalCard';
import { useAppContext } from '../../contexts/ContextProvider';


export default function AllProposals() {
  const { userDetails } = useAppContext();
  const [proposals, setProposals] = useState({ data: [] });
  const [selectedComponents, SetselectedComponents] = useState({ data: [] });
  useEffect(() => {
    getAllProposals().then(data => {
      setProposals(data);
    })
  }, [])
  useEffect(() => {
    getUserSelectedProposals(userDetails.user._id).then(data => {
      SetselectedComponents(data)
    })
  }, [])
  console.log(proposals)
  return <div>
    <div className='bannerImage'>
      <img src={partyImage} alt='Banner' />
    </div>
    <div className='allPosts'>
      {selectedComponents.data.length === 0 ? "" :
        <div>
          <span>Selected</span>
          <div className='proposalsContainer'>
            {selectedComponents.data.map(data => (
              <ProposalCard data={data} key={data._id} />
            ))}
          </div>
        </div>
      }
      <span>Proposals</span>
      <div className='proposalsContainer'>
        {
          proposals.data.length === 0 ? <div>No Proposals Available</div> :
            proposals.data.map(data => (
              <ProposalCard data={data} key={data._id} />
            ))
        }
      </div>
    </div>
  </div>
}
