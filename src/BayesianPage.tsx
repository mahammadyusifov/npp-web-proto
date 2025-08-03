import { useState } from 'react';

import Menu from './Components/Menu';
import Rectangular from './components/Rectangle';
function BayesianPage() {

  const [adults, setAdults] = useState(6);
  
  return (
    <>      
      <Rectangular 
      width='72%'
      height='650px'
      color = 'bg-gray-300'
      center = {{ x: '90%', y: '75%' }}
      shape = 'sharp-rectangle'
      >
      </Rectangular>

      <Menu/>
    </>
  )
}
export default BayesianPage
