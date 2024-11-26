import React from "react";

export const Spinner = () => {

    return (
        <div>
            <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}