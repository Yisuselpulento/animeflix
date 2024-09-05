import {Link} from 'react-router-dom'
const NotFound = () => {
  return (
    <div className='flex items-center justify-center h-screen flex-col'>
      <p><span className='text-primary text-6xl font-extrabold'>404</span> Pagina no Encontrada</p>
      <Link 
      className='text-primary hover:text-opacity-85 '
      to="/">Atras</Link>
    </div>
  )
}

export default NotFound