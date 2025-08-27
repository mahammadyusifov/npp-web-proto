import Rectangle from "../../utilities/rectangle";

const Background = () => {
  return (
    <>
      <Rectangle
        width="25%"
        height="93.5%"
        color="bg-gray-800"
        center={{ x: '10%', y: '70%' }}
        shape="sharp-rectangle"
      />
      <Rectangle
        width="75%"
        height="93.5%"
        color="bg-gray-200"
        center={{ x: '90%', y: '70%' }}
        shape="sharp-rectangle"
      />
    </>
  );
}
export default Background;