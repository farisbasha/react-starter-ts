
import Home from "@/assets/svg/home.svg"
import Cart from "@/assets/svg/cart.svg"
import Person from "@/assets/svg/person.svg"

const BottomNavBar = () => {
  return (
    <div className="h-[12vh] w-full bg-[#FFFFFF] px-4  dark:bg-zinc-800 rounded-t-3xl z-10 flex items-center" style={{ boxShadow: '0 -4px 6px rgba(0, 0, 0, 0.1)' }}>
      <div className="flex w-full justify-between items-center px-4">
        <img src={Home} alt="Star Icon" className="h-6 w-6" />
        <img src={Cart} alt="Star Icon" className="h-6 w-6" />
        <img src={Person} alt="Star Icon" className="h-6 w-6" />
      </div>
    </div>


  )
}

export default BottomNavBar