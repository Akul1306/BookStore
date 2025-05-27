import express from 'express';
import {Book} from '../models/bookModel.js' 

const router = express.Router();

// Route to save a new book
router.post('/books', async (request, response) => {      //post used for generating a new resource   //working with mongoose is an asynchronous function so async arrow function
    try {
        // Check if all required fields are present
        if (
            !request.body.title ||                          //a quick validation which comes from request.body
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }

        // Create a new book object
        const newBook = {
            title: request.body.title,                                       //if every field is filled then add it to new book by request.body
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

       const book = await Book.create(newBook);   //newBook is sent here for creation(adding to our data)
       return response.status(201).send(book);    //send th e book stored as a response

        // Send a success response
        return response.status(201).send({
            message: 'Book created successfully',
            book: newBook,
        });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});
router.get('/books',async (request,response) => {
    try{
        const books = await Book.find({});   //book.find has an empty object to get list of all books from database that is been stored
        return response.status(200).json({
            count: books.length,
            data: books
        });
    }
    catch(error){console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
    
})

router.get('/books/:id',async (request,response) => {
    try{
        const {id} = request.params;    // params is giving from :id url

        const books = await Book.findById(id);     //check for that id

        return response.status(200).json({    //returning response to the client
            count : books.length,
            data: books
        })
    }
    catch(error){
        console.log(error.massage);
        return response.status(500).send({ message: error.message });
    }
})

router.put('/books/:id', async(request,response)=> {
    try{
         if (
            !request.body.title ||                          //a quick validation which comes from request.body
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }

        const {id} = request.params;
        const result = await Book.findByIdAndUpdate(id,request.body);
        if(!result){
             return response.status(404).send({ message: 'Book not found!' });
        }
         return response.status(400).send({ message: 'Book updated successfully' });
    }
    catch(error){console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
})

router.delete('/books/:id', async (request,response) => {
 try{
       const {id} = request.params;
    const result = await Book.findByIdAndDelete(id);
    if(!result){
        return response.status(404).json({message:'Book not found'});
    }
    return response.status(200).send('Deleted successfully');
 }
 catch(error){
    console.log(error.message);
    return response.status(500).send({message: error.message});
 }
})

router.delete('/delete', async (req, res) => {
  try {
    const result = await Book.deleteMany({});
    return res.status(200).send({ message: 'Deleted all books', deletedCount: result.deletedCount });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

export default router;