import Footer from "../components/Footer"
import Header from "../components/Header";
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <Header />
      <main className="min-h-[400px] md:mt-[10 0px] md:px-[270px] px-2 py-3 mt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout