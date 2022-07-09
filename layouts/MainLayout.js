import Header from '../components/Header';

/*Main layout component has the structure and style of the main screen display */
const MainLayout = ({children}) => {
  
  /*Rendered component: loads the header, footer and a childern(any of the other components that we want to display between) */
  return (
    <>
        <Header/>
        {children}
    </>
  )
}

export default MainLayout;