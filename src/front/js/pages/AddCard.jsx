import React, { useState, useContext } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";


export const AddCard = () => {

	const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [ name, setName ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ address, setAddress ] = useState('');

	const handleSubmit = (event) => {
        event.preventDefault();
        const dataToSend = {
            name: name,
            phone: phone,
            email: email,
            address: address
        }
        actions.addContact(dataToSend);
        navigate("/contacts");
    }


	const handleReset = () => {
        navigate("/contacts");
    }
	

	return (
		<div className="container m-5">
			<div className="card">
				<h5 className="card-header"><i className="fas fa-address-card"></i> Add Contact </h5>
				<div className="card-body">
					<form onSubmit={handleSubmit}>
						<div className="mb-3">
							<label htmlFor="name" className="form-label"><i className="fa-solid fa-user me-1"></i><strong>Name:</strong> Full Name</label>
							<input type="text" className="form-control" id="name" value={name} aria-describedby="nameHelp" onChange={(e) => setName(e.target.value)}/>
						</div>
						<div className="mb-3">
							<label htmlFor="email" className="form-label"><i className="fa-solid fa-envelope me-1"></i><strong>Email:</strong> Contact email</label>
							<input type="email" className="form-control" id="email" value={email} aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} />

						</div>
						<div className="mb-3">
							<label htmlFor="phone" className="form-label"><i className="fa-solid fa-phone me-1"></i><strong>Phone:</strong> Contact phone</label>
							<input type="text" className="form-control" id="phone" value={phone} aria-describedby="phoneHelp" onChange={(e) => setPhone(e.target.value)} />
						</div>
						<div className="mb-3">
							<label htmlFor="address" className="form-label"><i className="fa-solid fa-house me-1"></i><strong>Address:</strong> Contact address</label>
							<input type="text" className="form-control" id="address" value={address} aria-describedby="addressHelp" onChange={(e) => setAddress(e.target.value)} />
							<div id="addressHelp" className="form-text text-danger mt-3"><i>** We'll never share your dates with anyone else.</i></div>
						</div>
						<div className="d-flex justify-content-between">
							<button type="reset" onClick={handleReset} className="btn btn-secondary">Cancel</button>
							<button type="submit" className="btn btn-warning">Add Contact</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};