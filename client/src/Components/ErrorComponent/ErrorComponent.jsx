import React from "react";
import './Error.css'

const ErrorComponent = ({ error }) => {


    return (
        <div>
            <div className="alert" role="alert">
                <h2 className="alert-danger p-1">{error}</h2>
                {/* <Image src={errorImg} className='img-fluid mt-1' style={{ height: 450, width: 700 }} /> */}
            </div>
        </div>
    )
}

export default ErrorComponent;