
export default function Winner(props) {
  const {winner,candidates,voteCounts} = props;
  function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) =>{ (binary += String.fromCharCode(b))});
    return window.btoa(binary);
  };

  const obj = candidates.find(item=>item?.partyName === winner);
  const voteCount = Number(voteCounts?.find(item=> item.name === obj?.partyName)?.voteCount?._hex);

  return (
    <div >
      <div className=" max-w-4xl ">
        <div className="mx-auto mt-4 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight text-white">Highest Vote</h3>
            <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-yellow-600">{obj?voteCount:("loading...")}</span>
                  <span className="text-lg font-semibold leading-6 tracking-wide text-yellow-400">votes</span>
                </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-200">PARTY NAME:</h4>
              <h2 className="flex-none text-xl font-semibold leading-6 text-white">{obj?obj.partyName:"loading"}</h2>
            </div>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-200">SYMBOL:</h4>
              <h2 className="flex-none text-xl font-semibold leading-6 text-white">{obj?obj.partySymbol:"loading"}</h2>
            </div>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-200">CANDIDATE NAME:</h4>
              <h2 className="flex-none text-xl font-semibold leading-6 text-white">{obj?obj.candidateName:"loading"}</h2>
            </div>

          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl   text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center ">
              <div className="">
              {obj?<img alt='image' src={`data:image/png;base64,${ arrayBufferToBase64(obj.partyImage.data.data)}`} className="border rounded-full ml-8 mt-8 mb-8" style={{width:"350px",height:"350px"}}></img>  
    :"loading"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
