import { Link } from 'react-router'
import NotFoundSVG from '../assets/404.svg?react'

const NotFoundPage = () => {
  return (
    <div className='mt-20 py-6 md:py-12 flex-grow flex flex-col items-center justify-between lg:justify-center gap-4'>
      <NotFoundSVG className='max-h-56 w-max md:max-h-96' />
      <div className='text-center'>
        <h1 className='text-titlepage mb-3 font-semibold'>Not Found</h1>
        <p className='text-body-base'>Maaf Halaman yang anda cari tidak ada. silahkan kembali ke <Link to='/' className='text-clr-primary hover:text-clr-primary-hover'>Beranda</Link></p>
      </div>
    </div>
  )
}

export default NotFoundPage