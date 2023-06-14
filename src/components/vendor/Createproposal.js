import React, { useEffect, useState } from 'react';
import { createProposal, editProposal } from '../../utils/utils.api';
import close from '../../Images/close.svg'
import { useAppContext } from '../../contexts/ContextProvider';



function Createproposal({ setCreate, setProposals, proposals, edit, setEdit }) {
  const [eventName, setName] = useState('');
  const [eventPlace, setPlaceOfEvent] = useState('');
  const [proposaltype, setProposalType] = useState('');
  const [eventType, setEventType] = useState('');
  const [budget, setBudget] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [foodPreferences, setFoodPreferences] = useState('');
  const [events, setEvents] = useState('');
  const { userDetails } = useAppContext();
  console.log(edit._id);
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handlePlaceOfEventChange = (e) => {
    setPlaceOfEvent(e.target.value);
  };
  const handleProposalTypeChange = (e) => {
    setProposalType(e.target.value);
  };
  const handleEventTypeChange = (e) => {
    setEventType(e.target.value);
  };
  const handleBudgetChange = (e) => {
    setBudget(e.target.value);
  };
  const handleFromChange = (e) => {
    setFrom(e.target.value);
  };
  const handleToChange = (e) => {
    setTo(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleFoodPreferencesChange = (e) => {
    setFoodPreferences(e.target.value);
  };
  const handleEventsChange = (e) => {
    setEvents(e.target.value);
  };

  useEffect(() => {
    if (edit) {
      setName(edit.eventName);
      setPlaceOfEvent(edit.eventPlace);
      setProposalType(edit.proposaltype);
      setEventType(edit.eventType);
      setBudget(edit.budget);
      setFrom(edit.from);
      setTo(edit.to);
      setDescription(edit.description);
      setFoodPreferences(edit.foodPreferences);
      setEvents(edit.events);
    }
  }, [])

  function setPreview(files) {
    setImages("");
    for (let i = 0; i < files.length; i++) {
      let url = URL.createObjectURL(files[i]);
      setPreviewImages(arr => ([...arr, url]));
      setImages(arr => ([...arr, files[i]]));
    }
  }
  function submitProposal(e) {
    e.preventDefault();
    let newProposal = new FormData(e.target);
    newProposal.append("VendorId", userDetails.user._id)
    console.log(newProposal);

    if (edit) {
      editProposal(newProposal, edit._id).then(res => {
        if (res.status === "Success") {
          setCreate(false);
          setEdit("");
          setProposals(() => ([...proposals, res.proposals].reverse()))
        } else {
          alert(res.message);
        }
      })
    } else {
      createProposal(newProposal).then(res => {
        if (res.status === "Success") {
          setCreate(false);
          setProposals(() => ([...proposals, res.data].reverse()))
        } else {
          alert(res.message);
        }
      })
    }
  }
  return (
    <form onSubmit={submitProposal} encType="multipart/form-data">
      <div className='createProposal'>
        <div className='titleContainer'>
          <h2>Create proposal</h2>
          <img src={close} alt='close'
            onClick={() => {
              setCreate(false);
              setEdit("");
            }}
          />
        </div>
        <div className='contentContainer'>

          <div className='leftContainer'>
            <div className='fieldContainer'>
              <label>Event Name</label>
              <input placeholder='Name'  name="eventName" type='text' required onChange={(e) => handleNameChange(e)} value={eventName} />
            </div>
            <div className='leftRowContainer'>
              <div className='fieldContainer'>
                <label htmlFor="place">Place of Event</label>
                <select id="place" name="eventPlace" value={eventPlace} onChange={(e) => {
                  handlePlaceOfEventChange(e)
                }}>
                  <option value={"Select"} >Select</option>
                  <option value={"Tamilnadu"} >Tamilnadu</option>
                  <option value={"Bengaluru"} >Bengaluru</option>
                  <option value={"Hydrabad"} >Hydrabad</option>
                  <option value={"Kerala"} >Kerala</option>
                </select>
              </div>
              <div className='fieldContainer'>
                <label htmlFor="proposalType">Proposal Type</label>
                <select id="proposalType" name="proposaltype" value={proposaltype} onChange={(e) => {
                  handleProposalTypeChange(e)
                }}>
                  <option value={"Select"} >Select</option>
                  <option value={"Formal"} >Formal</option>
                  <option value={"In-Formal"} >In-Formal</option>
                  <option value={"Internal"} >Internal</option>
                  <option value={"External"} >External</option>
                </select>
              </div>
              <div className='fieldContainer'>
                <label htmlFor="eventType">Event Type</label>
                <select id="eventType" name="eventType" value={eventType} onChange={(e) => {
                  handleEventTypeChange(e)
                }}>
                  <option value={"Select"} >Select</option>
                  <option value={"Wedding"} >Wedding</option>
                  <option value={"Birthday"} >Birthday</option>
                  <option value={"Reception"} >Reception</option>
                  <option value={"Charity"} >Charity</option>
                  <option value={"Party"} >Party</option>
                  <option value={"Product launch"} >Product launch</option>
                </select>
              </div>
              <div className='fieldContainer'>
                <label>Budget</label>
                <input placeholder='Budget' id='budgetInput' type='text' name="budget"required onChange={(e) => handleBudgetChange(e)} value={budget} />
              </div>
              <div className='fieldContainer'>
                <label>From</label>
                <input type='date' name="from" required onChange={(e) => handleFromChange(e)} value={from} />
              </div>
              <div className='fieldContainer'>
                <label>To</label>
                <input type='date' name="to" required onChange={(e) => handleToChange(e)} value={to} />
              </div>
            </div>
            <div>
              <div className='fieldContainer'>
                <label>Description</label>
                <textarea placeholder='Description' id='decpInput' type='text' name="description" required onChange={(e) => handleDescriptionChange(e)} value={description} />
              </div>
            </div>
          </div>
          <div className='line'></div>
          <div className='rightContainer'>
            <div className="img-field">
              <div className="label-field">
                <label>Images</label>
                <input type="file" id="img-file" filename="images" name="images" multiple="multiple" onChange={(e) => setPreview(e.target.files)} />
                <label id="img-btn" htmlFor="img-file" >Add</label>
              </div>
              <div className="img-grid">
                <div className="img-container"><img src={previewImages[0]} alt="" /></div>
                <div className="img-container"><img src={previewImages[1]} alt="" /></div>
                <div className="img-container"><img src={previewImages[2]} alt="" /></div>
                <div className="img-container"><img src={previewImages[3]} alt="" /></div>
                <div className="img-container"><img src={previewImages[4]} alt="" /></div>
                <div className="img-container"><img src={previewImages[5]} alt="" /></div>
                <div className="img-container"><img src={previewImages[6]} alt="" /></div>
                <div className="img-container"><img src={previewImages[7]} alt="" /></div>
                <div className="img-container"><img src={previewImages[8]} alt="" /></div>
                <div className="img-container"><img src={previewImages[9]} alt="" /></div>
              </div>
            </div>
            <div className='foodContainer'>
              <label>Food Preferences</label>
              <textarea placeholder='Food preferences' name="foodprefernces"onChange={(e) => handleFoodPreferencesChange(e)} type='text' value={foodPreferences} />
            </div>
            <div className='EventContianer'>
              <label>Events</label>
              <textarea placeholder='Events available' name="events" onChange={(e) => handleEventsChange(e)} type='text' value={events} />
            </div>
          </div>
        </div>
        <hr />
        <div className='buttonContainer'>
          <button className='submitButton' 
          
            type='submit'
          >{edit ? "Edit" : "Add"}</button>
        </div>
      </div>
    </form>
  )


};


export default Createproposal