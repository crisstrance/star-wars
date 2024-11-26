import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";
import yoda from "../../img/Yoda.png";


export const Contact = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const contacts = store.contacts;

    const handleEdit = (item) => {
        store.newContact = item;
        navigate("/edit-contact");
    }

    const handleDelete = (item) => {
        actions.deleteContact(item);
    }

    return (
        <div className="container mt-4">
            <h1 className="text-light">Contacts</h1>
            <div className="d-flex justify-content-end">
                <button className="btn btn-warning mb-4" onClick={() => navigate('/add-contact')}>Add a new contact</button>
            </div>
            {contacts.map((item, index) => (
                <div key={index} className="d-flex justify-content-between border border-warning p-4 mb-4 text-light">
                    <img className="me-5" style={{ width: '170px' }} src={yoda} />
                    <div className="me-auto">
                        <p className="h4 my-3 text-light">{item.name}</p>
                        <p><i className="fas fa-phone me-2 text-light"></i> {item.phone}</p>
                        <p><i className="fas fa-envelope me-2 text-light"></i> {item.email}</p>
                        <p><i className="fas fa-map-marker-alt me-2 text-light"></i> {item.address}</p>
                    </div>
                    <div>
                        <i className="fas fa-edit me-3 text-info" onClick={() => handleEdit(item)}></i>
                        <i className="fas fa-trash-alt text-danger" onClick={() => handleDelete(item)}></i>
                    </div>
                </div>
            ))}
            <div className="container d-flex justify-content-center">

                <div className={`alert alert-warning text-center mx-5 ${contacts.length == 0 ? '' : 'd-none'}`} role="alert">
                <i className="fa-solid fa-jedi"></i> There are no contacts in the galaxy to show!
                </div>
            </div>
        </div>
    );
}