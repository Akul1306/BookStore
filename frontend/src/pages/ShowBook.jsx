import React, {useEffect,useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Backbutton from '../components/BackButton.jsx';
import Spinner from '../components/Spinner.jsx';

const ShowBook = () => {
    const [book,setBook] = useState({});
    const [loading,setLoading] = useState(false);
    const {id} = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/books/${id}`)
        .then((response) => {
            setBook(response.data);
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
        });
    },[])
  return (
    <div className='p-4'>
        <Backbutton/>
        <h1 className='text-3xl my-4'>Show Book</h1>
        {loading ? (
            <Spinner />
        ) : (
          <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
            <div className = 'm-4'> 
                <span className = 'text-xl mr-4 text-gray-500'>Id</span>
                <span>{book.title}</span>
                </div>
                <div className = 'm-4'>
                    <span className = 'text-xl mr-4 text-gray-500'>Author</span>
                    <span>{book.author}</span>
                     </div>
                       <div className = 'm-4'>
                    <span className = 'text-xl mr-4 text-gray-500'>Publish year</span>
                    <span>{book.publishYear}</span>
                     </div>
                       <div className = 'm-4'>
                    <span className = 'text-xl mr-4 text-gray-500'>Create Time</span>
                    <span>{book.createdAt && new Date(book.createdAt).toLocaleString()}</span>

                     </div>
                       <div className = 'm-4'>
                    <span className = 'text-xl mr-4 text-gray-500'>Last Updated Time</span>
                    <span>{new Date(book.updatedAt).toLocaleString()}</span>
                     </div>
          </div>

        )}
    </div>
  )
}

export default ShowBook