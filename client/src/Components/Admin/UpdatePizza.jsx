import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { singlePizza, fetchAllPizza, updatePizza } from '../../reducers/PizzReducer';
import axios from 'axios';

const UpdatePizza = () => {
  let dispatch = useDispatch()
  const { id } = useParams()


  // const { singlePizzas, allPizzas } = useSelector((state) => state.pizza)
  // console.log(allPizzas)

  // const [updateDatas, setUpdateDatas] = useState();
  // useEffect(() => {
  //   if (id) {
  //     const singlePizza = allPizzas.filter((ele) => ele._id === id);
  //     setUpdateDatas(singlePizza[0]);
  //   }
  // }, [allPizzas])

  const [image, setimage] = useState(null);
  const [data, setdata] = useState({});
  const [arrayValues, setArrayValues] = useState([]);
  useEffect(() => {
    // dispatch(singlePizza(id))
    // dispatch(fetchAllPizza())
    axios.get("http://localhost:9300/get-burger-by-id/" + id, { withCredentials: true })
      .then((data) => {
        console.log(data.data.singledata)
        setdata({ ...data.data.singledata[0], ...data.data.singledata[0].prices[0] })
        setArrayValues(data.data.singledata[0].varients)
      })
  }, [])
  console.log(data)
  console.log(arrayValues)



  function handlesubmit(e) {
    e.preventDefault()
    console.log(data)
    const formData = new FormData();
    if (data.name) {
      formData.append('name', data.name);
    }
    formData.append('category', data.category);
    formData.append('small', data.small);
    formData.append('medium', data.medium);
    // formData.append('category', data.category);
    formData.append('description', data.description);
    formData.append('image', image);
    arrayValues.forEach((value, index) => {
      formData.append(`array[${index}]`, value);
    });

    console.log(formData)
    dispatch(updatePizza({ data: formData, id: id }))

  }

  function handlefilechange(event) {
    setimage(event.target.files[0]);
  }
  function handlechange(e) {
    setdata({ ...data, [e.target.name]: e.target.value })
  }

  function handleInputChange(event) {
    const { value } = event.target;
    const values = value.split(',').map((item) => item.trim());
    setArrayValues(values);
  }

  return (
    <>
      <div className='w-100 mx-auto container p-4'>
        <h1 className='text-center'>Update Pizza</h1>
        <form onSubmit={handlesubmit} method="post" className='row justify-content-center admin-addpizza-box' enctype="multipart/form-data">

          <div class="mb-3 col-lg-5">
            <label for="exampleInputEmail1" class="form-label">name</label>
            <input class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='name' value={data.name} onChange={handlechange} />

          </div>
          <div className="mb-3 col-lg-5">
            <label for="exampleInputPassword1" className="form-label">category</label><br />
            Non-Veg : <input type="radio" className="form-check-input mx-1"
              value='non-veg'
              name='category'
              checked={data && data.category === "non-veg"}
              onChange={handlechange} />
            Veg :<input type="radio" className="form-check-input mx-1"
              value='veg'
              name='category'
              checked={data && data.category === "veg"}
              onChange={handlechange} />
          </div>
          <div class="mb-3 col-lg-5">
            <label for="exampleInputPassword1" class="form-label">description</label>
            <input type="text" class="form-control" id="exampleInputPassword1" name='description' value={data.description} onChange={handlechange} />
          </div>
          <div class="mb-3 col-lg-5">
            <label for="exampleInputPassword1" class="form-label">smallPrice</label>
            <input type="number" class="form-control" id="exampleInputPassword1" name='small' value={data.small} onChange={handlechange} />
          </div>
          <div class="mb-3 col-lg-5">
            <label for="exampleInputPassword1" class="form-label">mediumPrice</label>
            <input type="number" class="form-control" id="exampleInputPassword1" name='small' value={data.medium} onChange={handlechange} />
          </div>
          <div class="mb-3 col-lg-5">
            <label for="exampleInputPassword1" class="form-label">largePrice</label>
            <input type="number" class="form-control" id="exampleInputPassword1" name='large' value={data.large} onChange={handlechange} />
          </div>
          <div class="mb-3 col-lg-5">
            <label for="exampleInputPassword1" class="form-label">Variants</label>
            <input type="text" class="form-control" value={arrayValues.join(', ')} onChange={handleInputChange} />
          </div>
          <div class="mb-3 col-lg-5">
            <label for="exampleInputPassword1" class="form-label">image</label>
            <input type="file" class="form-control" id="exampleInputPassword1" name='image' onChange={handlefilechange} />
          </div>
          <div className='text-center mb-2 col-md-3'>
            <button type="submit" class="btn btn-danger">UPDATE</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default UpdatePizza
