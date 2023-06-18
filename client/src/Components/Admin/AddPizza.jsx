import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { addPizza } from '../../reducers/PizzReducer';


const AddBurger = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [image, setimage] = useState(null);
    const [data, setdata] = useState({});
    const [arrayValues, setArrayValues] = useState([]);


    function handlesubmit(e) {
        e.preventDefault();

        const uploadData = new FormData();
        console.log(uploadData)
        uploadData.append('name', data.name);
        uploadData.append('description', data.description);
        uploadData.append('category', data.category);
        uploadData.append('small', data.small);
        uploadData.append('medium', data.medium);
        uploadData.append('large', data.large);
        uploadData.append('image', image);
        arrayValues.forEach((value, index) => {
            uploadData.append(`array[${index}]`, value);
        });
        // checkboxData.forEach((value, index) => {
        //     uploadData.append(`array[${index}]`, value);
        // });

        dispatch(addPizza(uploadData));

        setdata({
            name: "",
            description: "",
            category: "",
            smallPrice: "",
            mediumPrice: "",
            largePrice: ""
        })
    }

    function handlefilechange(event) {
        setimage(event.target.files[0])
    }

    function handlechange(e) {
        setdata({ ...data, [e.target.name]: e.target.value })
    }

    const [checkboxData, setCheckboxData] = useState([]);

    // const handleCheckboxChange = (e, value) => {
    //     if (e.target.checked) {
    //         setCheckboxData([...checkboxData, e.target.value]);
    //     }
    //     else {
    //         setCheckboxData(checkboxData.filter((item) => item !== value));
    //     }
    //     console.log(checkboxData)
    // };

    function handleInputChange(event, index) {
        const { value } = event.target;
        const values = value.split(',').map((item) => item.trim());
        console.log(values)
        setArrayValues(values);
    }

    return (
        <>
            <div className='w-100 mx-auto container p-4'>
                <h1 className='text-center'>ADD PRODUCTS</h1>
                <form onSubmit={handlesubmit} method="post" className='row justify-content-center admin-addpizza-box' enctype="multipart/form-data">

                    <div className="mb-3 col-lg-5">
                        <label for="exampleInputEmail1" className="form-label">name</label>
                        <input className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='name' onChange={handlechange} />
                    </div>

                    <div className="mb-3 col-lg-5">
                        <label for="exampleInputPassword1" className="form-label">category</label><br />
                        Non-Veg : <input type="radio" className="form-check-input mx-2"
                            value='non-veg' name='category' onChange={handlechange} />
                        Veg :<input type="radio" className="form-check-input mx-2"
                            value='veg' name='category' onChange={handlechange} />
                    </div>

                    <div className="mb-3 col-lg-5">
                        <label for="exampleInputPassword1" className="form-label">description</label>
                        <input type="text" className="form-control" id="exampleInputPassword1" name='description' onChange={handlechange} />
                    </div>
                    <div className="mb-3 col-lg-5">
                        <label for="exampleInputPassword1" className="form-label">smallPrice</label>
                        <input type="number" className="form-control" id="exampleInputPassword1" name='small' onChange={handlechange} />
                    </div>
                    <div className="mb-3 col-lg-5">
                        <label for="exampleInputPassword1" className="form-label">mediumPrice</label>
                        <input type="number" className="form-control" id="exampleInputPassword1" name='medium' onChange={handlechange} />
                    </div>
                    <div className="mb-3 col-lg-5">
                        <label for="exampleInputPassword1" className="form-label">largePrice</label>
                        <input type="number" className="form-control" id="exampleInputPassword1" name='large' onChange={handlechange} />
                    </div>
                    <div className="mb-3 col-lg-5">
                        <label for="exampleInputPassword1" className="form-label">Variants</label>
                        <input type="text" className="form-control" value={arrayValues.join(', ')} onChange={handleInputChange} />
                    </div>
                    {/* <label>
                        small:
                        <input
                            type="checkbox"
                            value="small"
                            // checked={checkboxData.includes('small')}
                            // onChange={(e) => handleCheckboxChange(e, 'small')}
                            onChange={handleCheckboxChange}

                        />
                    </label>
                    <label>
                        medium :
                        <input
                            type="checkbox"
                            value="medium"
                            // checked={checkboxData.includes('medium')}
                            // onChange={(e) => handleCheckboxChange(e, 'medium')}
                            onChange={handleCheckboxChange}

                        />
                    </label>
                    <label>
                        large :
                        <input
                            type="checkbox"
                            value="large"
                            // checked={checkboxData.includes('large')}
                            // onChange={(e) => handleCheckboxChange(e, 'large')}
                            onChange={handleCheckboxChange}
                        />
                    </label> */}

                    <div className="mb-3 col-lg-5">
                        <label for="exampleInputPassword1" className="form-label">image</label>
                        <input type="file" className="form-control" id="exampleInputPassword1" name='image' onChange={handlefilechange} />
                    </div>

                    <div className='text-center mb-2 col-md-3 '>
                        <button type="submit" className="w-100 btn btn-danger">ADD</button>
                    </div>

                </form>


            </div>

        </>
    )
}

export default AddBurger