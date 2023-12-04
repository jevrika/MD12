import { useEffect, useState } from 'react';
import { bookCreatedAt } from '../bookCreatedAt';
import './bookCard.css'
import axios from 'axios'
import { Book } from '../types'


const Card = (props: { handleEdit: (arg0: Book) => void; }) => {
  const [bookData, setBookData] = useState<Book[]>([]);

  useEffect(() => {
    getBooks()
  }, [])

  const getBooks = () => {
    axios.get<Book[]>('http://localhost:3000/books').then((response) => {
      setBookData(response.data.reverse())
    })
  }

  const getGenreImage = (genre: string) => {
    if (genre === "") {
      return `/src/assets/images/unknown.png`
    } else {
      return `/src/assets/images/${genre.toLowerCase()}.png`
    }
    
  }
  const handleDeleteBook = (bookId: number) => {
    axios.delete(`http://localhost:3000/books/${bookId}`).then(() => {
      getBooks()
    })
  }

  const handleEditButton = (bookId: number) => {
    axios.get(`http://localhost:3000/books/${bookId}`).then((response) => {
      props.handleEdit(response.data)
    })
  }

  return (
    <>
      {
        bookData && bookData.map((book) => (
          <div key={book.id} className="js-book-wrapper book-wrapper">
            <div className="book"   >

              <div className="genre-image-wrapper">
                <img className="genre-image" src={getGenreImage(book.genre)} alt="Genre Image" />
              </div>

              <h1 className="book__heading">{book.name}</h1>
              <h2 className="book-author__heading"> {book.author}</h2>
              <h3 className="book-genres__heading">{book.genre}  </h3>
              <h4 className="book-year__heading">The year of publishing : {book.year}</h4>

              <button className='js-edit__button book-edit__button' onClick={() => handleEditButton(book.id)}> Edit </button>
              <button className='js-delete__button book-delete__button' onClick={() => handleDeleteBook(book.id)}> Delete </button>

              <p className="creating-date">{bookCreatedAt(book.createdAt)} </p>
            </div>
          </div>
        ))}
    </>
  );
}
export default Card;