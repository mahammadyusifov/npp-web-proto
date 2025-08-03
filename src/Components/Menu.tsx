import Rectangular from './Rectangle';
import Hoverable from '../components/Hoverable';

const Menu: React.FC = () => {
  return (
    <Rectangular
      width = '28%'
      height = '93%'
      color = 'bg-gray-700'
      center = {{ x: '13%', y: '60%' }}
      >
        <Hoverable
            text = "FP value"
            center={{ x: '50%', y: '20%' }}
          />

        <Hoverable
            text = "Requirement Dev"
            center={{ x: '50%', y: '26.2%' }}
          />

        <Hoverable
           text = "Reqirement V&V"
           center = {{ x: '50%', y: '32.4%' }}
        />
        <Hoverable
           text = "Design Dev"
           center = {{ x: '50%', y: '38.6%' }}  
        />
        <Hoverable
           text = "Design V&V"
           center = {{ x: '50%', y: '44.8%' }}
        />
        <Hoverable
           text = "Reliability V&V"
           center = {{ x: '50%', y: '51%' }}
        />
        <Hoverable
           text = "Reliability Dev"
           center = {{ x: '50%', y: '57.2%' }}
        />
        <Hoverable
           text = "Bayesian Methods"
           center = {{ x: '50%', y: '63.4%' }}
        />
        <Hoverable
           text = "Statistical Methods"
           center = {{ x: '50%', y: '69.6%' }}
        />
        <Hoverable
           text = "Reliability Views"
           center = {{ x: '50%', y: '75.8%' }}
        />
        <Hoverable
           text = "Settings"
           center = {{ x: '50%', y: '82%' }}
        />

      </Rectangular>
    );
}

export default Menu;