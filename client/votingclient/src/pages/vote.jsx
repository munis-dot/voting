import { useContext } from "react";
import Header from "../components/header";
import Table from "../components/tables";
import { voterContext } from "../context/voterContext";
function Vote() {
  const { voter } = useContext(voterContext)
  return (
    <div>
      <div style={{ position: "absolute" }}><h1 className='text-white font-bold ml-10'>W3 VOTING</h1></div>
      <Header />
      {!voter
        ?
        <Table />
        :
        <h1 className='text-white text-center font-bold text-9xl'>YOUR VOTE SUCCESSFULLY SUBMITTED</h1>
      }
    </div>
  );
}
export default Vote;