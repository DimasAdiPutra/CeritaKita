import { Link } from "react-router"
import Logo from "../components/ui/Logo"
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok, FaTwitter } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="bg-clr-container-dark">
      <div className="mx-auto max-h-96 px-4 md:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center items-center gap-10 py-12 md:justify-between">
          <Link to="/">
            <Logo />
          </Link>

          <ul className="flex flex-wrap justify-between gap-x-12 gap-y-6 md:gap-y-4 max-w-72 lg:max-w-none">
            <li>
              <Link
                to="/"
                className='text-clr-text-dark hover:text-clr-text-dark-hover transition-colors'
              >
                About Us
              </Link>
            </li>

            <li>
              <Link
                to="/"
                className='text-clr-text-dark hover:text-clr-text-dark-hover transition-colors'
              >
                Contacts
              </Link>
            </li>

            <li>
              <Link
                to="/"
                className='text-clr-text-dark hover:text-clr-text-dark-hover transition-colors'
              >
                Terms
              </Link>
            </li>

            <li>
              <Link
                to="/"
                className='text-clr-text-dark hover:text-clr-text-dark-hover transition-colors'
              >
                Privacy
              </Link>
            </li>

            <li>
              <Link
                to="/"
                className='text-clr-text-dark hover:text-clr-text-dark-hover transition-colors'
              >
                Cookies
              </Link>
            </li>

            <li>
              <Link
                to="/"
                className='text-clr-text-dark hover:text-clr-text-dark-hover transition-colors'
              >
                License
              </Link>
            </li>
          </ul>
        </div>


        <hr className="border-0 outline-0 h-px bg-clr-container-light" />

        <div className="flex flex-wrap justify-center md:justify-between items-center gap-4 py-12">
          <p className="text-clr-text-dark text-body-small-base">CeritaKita @ 2025. All rights reserved.</p>

          <ul className="flex justify-center gap-6 md:gap-8">
            <li className="w-6 h-6 flex justify-center items-center">
              <Link
                to='/'
                className="text-clr-text-dark transition text-subheading hover:text-clr-text-dark-hover"
              >
                <span className="sr-only">Facebook</span>
                <FaFacebookF />
              </Link>
            </li>

            <li className="w-6 h-6 flex justify-center items-center">
              <Link
                to='/'
                className="text-clr-text-dark transition text-subheading hover:text-clr-text-dark-hover"
              >
                <span className="sr-only">Instagram</span>
                <FaInstagram />
              </Link>
            </li>

            <li className="w-6 h-6 flex justify-center items-center">
              <Link
                to='/'
                className="text-clr-text-dark transition text-subheading hover:text-clr-text-dark-hover"
              >
                <span className="sr-only">Twitter</span>
                <FaTwitter />
              </Link>
            </li>

            <li className="w-6 h-6 flex justify-center items-center">
              <Link
                to='/'
                className="text-clr-text-dark transition text-subheading hover:text-clr-text-dark-hover"
              >
                <span className="sr-only">Tiktok</span>
                <FaTiktok />
              </Link>
            </li>

            <li className="w-6 h-6 flex justify-center items-center">
              <Link
                to='/'
                className="text-clr-text-dark transition text-subheading hover:text-clr-text-dark-hover"
              >
                <span className="sr-only">LinkedIn</span>
                <FaLinkedinIn />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer