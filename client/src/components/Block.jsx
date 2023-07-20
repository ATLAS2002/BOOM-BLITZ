import '../styles/Block.css'

const Block = ({ pos, shade, bombs, isRevealed, onClick }) => {
  let type = 'grass';
  // switch(bombs) {
  //   case 0: type = 'water';
  //         break;
  //   case 1: type = 'soil';
  //         break;
  // }
  if(isRevealed) {
    if(bombs > 5) 
      type = "stone";
    else if(bombs > 0)
      type = "soil";
    else
      type = "water";
  }
  return (
    <btn className={`block ${type} ${shade}`} 
    onClick={()=>onClick(pos)}> 
    {isRevealed && (bombs > 0) && bombs} </btn>
  )
}

export default Block