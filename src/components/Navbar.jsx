import React, { useEffect } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { FiShoppingCart} from 'react-icons/fi'
import { BsChatLeft } from 'react-icons/bs'
import { RiNotification3Line } from 'react-icons/ri'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import avatar from '../data/avatar.jpg'
import { Cart, Notification, Chat, UserProfile } from '.';
import { useStateContext } from '../contexts/ContextProvider'

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position='BottomCenter'>
    <button type='button' onClick={customFunc} style={{color}} 
    className='relative p-3 text-xl rounded-full hover:bg-light-gray'>
      <span style={{background:dotColor}} className="absolute w-2 h-2 rounded-full right-2 top-2 inline-flex"/>
        {icon}
      
    </button>
  </TooltipComponent>
)

const Navbar = () => {
  const { activeMenu, setActiveMenu ,isClicked, setIsClicked,handleClick,screenSize, setScreenSize,currentColor} = useStateContext();
  useEffect(()=>{
  const handleResize=()=>{
    setScreenSize(window.innerWidth)
  }
  window.addEventListener('resize',handleResize)
  handleResize();
  return()=>{
    window.removeEventListener('resize',handleResize);
  }
  },[])
  useEffect(()=>{
    if(screenSize <= 900){
      setActiveMenu(false)
    }else{ setActiveMenu(true)}
  },[screenSize])
  return (
    <div
      className='flex justify-between p-2 md:mx-6 relative'>
      <NavButton title='Menu'
       customFunc={() => setActiveMenu(prevActiveMenu => !prevActiveMenu)} 
       color={currentColor} icon={<AiOutlineMenu />} />
      <div className='flex'>
      <NavButton title='Cart'
       customFunc={()=>handleClick('cart')} 
       color={currentColor} icon={<FiShoppingCart />} />
        <NavButton title='Chat'
        dotColor='#03c9D7'
       customFunc={()=>handleClick('chat')} 
       color={currentColor} icon={<BsChatLeft />} />

        <NavButton title='Notification'
        dotColor='#03c9D7'
       customFunc={()=>handleClick('notification')} 
       color={currentColor} icon={<RiNotification3Line />} />
        <TooltipComponent title='Profile' position='BottomCenter' >
         <div 
         className='flex items-center cursor-pointer gap-2 p-2 rounded-lg hover:bg-light-gray'
         onClick={()=>handleClick('userProfile')}>
          <img className='w-8 h-8 rounded-full ' src={avatar}/>
          <p>
            <span className='text-gray-400 text-14'>Hi ,</span>{' '}
            <span className='text-gray-400 text-14'>Michael</span>
          </p>
          <MdKeyboardArrowDown 
          className='text-gray-400 text-14'/>
         </div>
        </TooltipComponent>
        {isClicked.cart && <Cart/>}
        {isClicked.notification && <Notification/>}
        {isClicked.chat && <Chat/>}
        {isClicked.userProfile && <UserProfile/>}
      </div>
      </div>
  )
}

export default Navbar