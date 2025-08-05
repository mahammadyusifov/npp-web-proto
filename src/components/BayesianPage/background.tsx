import Rectangle from "../../utilities/rectangle";

const Background = () => {
  return (
    <>
      <Rectangle
        width="30%"
        height="93.5%"
        color="bg-gray-800"
        center={{ x: '10%', y: '70%' }}
        shape="sharp-rectangle"
      />
      <Rectangle
        width="70%"
        height="93.5%"
        color="bg-red-200"
        center={{ x: '90%', y: '70%' }}
        shape="sharp-rectangle"
      />
    </>
  );
}
export default Background;