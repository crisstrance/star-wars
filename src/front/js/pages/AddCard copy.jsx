import React, { useState, useContext } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";


export const AddCard = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [address, setAddress] = useState('');

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

		return (
			<div className="container m-5">
				<div className="card">
					<h5 className="card-header"><i className="fas fa-address-card"></i> Add Contact </h5>
					<div className="card-body">
						<form >
							<div className="mb-3">
								<label for="contactPhone" className="form-label"><i className="fa-solid fa-user me-1"></i><strong>Name:</strong> Full Name</label>
								<input type="text" className="form-control" id="contactPhone" aria-describedby="contactPhoneHelp" />
							</div>
							<div className="mb-3">
								<label for="exampleInputEmail1" className="form-label"><i className="fa-solid fa-envelope me-1"></i><strong>Email:</strong> Contact email</label>
								<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
								
							</div>
							<div className="mb-3">
								<label for="contactPhone" className="form-label"><i className="fa-solid fa-phone me-1"></i><strong>Phone:</strong> Contact phone</label>
								<input type="text" className="form-control" id="contactPhone" aria-describedby="contactPhoneHelp" />
							</div>
							<div className="mb-3">
								<label for="contactPhone" className="form-label"><i className="fa-solid fa-house me-1"></i><strong>Address:</strong> Contact address</label>
								<input type="text" className="form-control" id="contactPhone" aria-describedby="contactPhoneHelp" />
								<div id="addressHelp" className="form-text text-danger">We'll never share your email with anyone else.</div>
							</div>
							<div className="d-flex justify-content-between">
								<button type="submit" className="btn btn-warning">Add Contact</button>
								<button type="submit" className="btn btn-secondary">Cancel</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	};
}