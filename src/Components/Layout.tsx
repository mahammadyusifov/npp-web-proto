import NavigationBar from './NavigationBar'; // Your smart component
import NavItem from './NavItem';

const Layout = ({ children }) => {
  return (
    <>
        <NavigationBar>

          <NavItem text="Bayesian Methods" position={{ x: '7%', y: '50%' }} />
       
          <NavItem text = "Statistical Methods" position={{ x: '19%', y: '50%' }} />

          <NavItem text = "Reliabiliity Views" position={{ x: '31.5%', y: '50%' }} />

          <NavItem text = "Settings" position={{ x: '95%', y: '50%' }} />

        </NavigationBar>

        {children}
    </>
  );
};

export default Layout;