import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addtoSelectedList, getProposalById } from '../../utils/utils.api';
import { useAppContext } from '../../contexts/ContextProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SingleProposal() {
    const params = useParams();
    const [proposal, setProposal] = useState([]);
    const { userDetails } = useAppContext();
    const navigate = useNavigate();
    useEffect(() => {
        getProposalById(params.id).then((data) => {
            setProposal(data.data)
        })
    }, [])
    const id = proposal._id;
    const data = {
        id
    }
    console.log(proposal)
    return proposal.length === 0 ? <div className='preLoading'>pls wait...</div> :
        <div className='bodyContainer'>
            <div className='topContainer'>
                <div className='topRow'>
                    <div>Proposal <span className='ContactName'>{proposal.VendorId.name} Contract</span></div>
                    <div className='SelectButton'>
                        <button
                            onClick={() => {
                                addtoSelectedList(userDetails.user._id, data).then(data => {
                                    console.log(data);
                                    data.status === "Success" ? toast.success("Added Successfully" , {
                                        position : 'top-right'
                                    }) : toast.error(data.message , {
                                        position : 'top-right'
                                    })
                                })
                            }}
                        >Select</button>
                        <button
                            onClick={() => navigate(-1)}
                        >Back</button>
                    </div>
                </div>
                <div className='row1'>
                    <div className='vendorDetails'>
                        <img src={proposal.images[0]} alt='Vendor Image' />
                        <div className='column'>
                            <div className='topic1'>Name</div>
                            <div className='details1'>{proposal.VendorId.name}</div>
                        </div>
                        <div className='column'>
                            <div className='topic1'>Email</div>
                            <div className='details1'>{proposal.VendorId.email}</div>
                        </div>
                        <div className='column'>
                            <div className='topic2'>Start Date</div>
                            <div className='details2'>{proposal.from}</div>
                        </div>
                        <div className='column'>
                            <div className='topic2'>End Date</div>
                            <div className='details2'>{proposal.to}</div>
                        </div>
                        <div className='column'>
                            <div className='topic2'>Event Type</div>
                            <div className='details2'>{proposal.eventType}</div>
                        </div>
                        <div className='column'>
                            <div className='topic2'>Event Class</div>
                            <div className='details2'>Class A</div>
                        </div>
                    </div>
                    <div className='venue'>
                        <span className='venueTopic'>
                            Venue And Arrangements
                        </span>
                        <span className='venueDetails'>
                            {proposal.eventPlace}
                        </span>
                    </div>
                    <div className='venue'>
                        <span className='venueTopic'>
                            Food Preferences
                        </span>
                        <span className='venueDetails'>
                            {proposal.foodprefernces}
                        </span>
                    </div>
                </div>
                <div className='row2'>
                    <div className='album'>
                        <span className='albumtopic'>
                            My album
                        </span>
                        <span className='albumImages'>
                            {
                                proposal.images.map((data, index) => (
                                    <img src={data} alt='album' key={index} />
                                ))
                            }
                        </span>
                    </div>
                    <div className='album contact'>
                        <span className='albumtopic'>
                            Contact
                        </span>
                        <span className='albumdetails'>
                            {proposal.VendorId.contact}
                        </span>
                    </div>
                    <div className='album contact'>
                        <span className='albumtopic'>
                            Events
                        </span>
                        <span className='albumdetails' id='eventDetails'>
                            {proposal.events}
                        </span>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
}