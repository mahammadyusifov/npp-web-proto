import NavigationBar from './navigationBar'; 
import NavItem from './navItem';

const Layout = ({ children }) => {
  return (
    <>
        <NavigationBar>

          <NavItem text="Bayesian Methods" position={{ x: '35%', y: '50%' }} />
       
          <NavItem text = "Statistical Methods" position={{ x: '49%', y: '50%' }} />

          <NavItem text = "Reliabiliity Views" position={{ x: '63.5%', y: '50%' }} />

          <NavItem text = "Settings" position={{ x: '95%', y: '50%' }} />

        </NavigationBar>

        {children}
    </>
  );
};

export default Layout;