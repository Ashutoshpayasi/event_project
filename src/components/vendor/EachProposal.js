import editicon from '../../Images/pencil-edit-button.svg';
import deleteicon from '../../Images/bin.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteVendorProposal } from '../../utils/utils.api';
import { useAppContext } from '../../contexts/ContextProvider';

export default function EachProposal({ vendorProposals, onDeleteFunc, setCreatePage, setEdit }) {
    const { userDetails } = useAppContext();
    return <div className="singleProposal">
        <div className="eventName">{vendorProposals.eventName}</div>
        <div className="eventDesc">{vendorProposals.description}</div>
        <div className="detailsContainer">
            <div className="details">
                <div>Event Type</div>
                <section>{vendorProposals.eventType}</section>
            </div>
            <div className="details">
                <div>Proposal Type</div>
                <section>{vendorProposals.proposaltype}</section>
            </div>
            <div className="details">
                <div>From Date</div>
                <section>{vendorProposals.from}</section>
            </div>
            <div className="details">
                <div>To Date</div>
                <section>{vendorProposals.to}</section>
            </div>
            <div className="details">
                <div>Budget</div>
                <section>{vendorProposals.budget}</section>
            </div>
            <div className="optionsContainer">
                <img src={editicon} alt="Edit" onClick={() => {
                    setEdit(vendorProposals);
                    setCreatePage(true);
                }} />
                <section onClick={() => {
                    deleteVendorProposal(vendorProposals._id, userDetails.token).then(res => {
                        if (res.status === "Success") {
                            toast.success("Deleted Successfully", {
                                position: 'top-right'
                            })
                            onDeleteFunc(vendorProposals._id);
                        } else {
                            toast.error(res.message, {
                                position: 'top-right'
                            })
                        }
                    })
                }}>
                    <img src={deleteicon} alt="Delete" />
                </section>
            </div>
        </div>
        <ToastContainer />
    </div>
}