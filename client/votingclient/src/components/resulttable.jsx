import React from 'react'

function Resulttable(props) {

    const { voteCount, candidates } = props;

    function arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => { (binary += String.fromCharCode(b)) });
        return window.btoa(binary);
    };
    let counts = voteCount ? [...voteCount] : []
    let sortedItems = counts?.sort((a, b) => Number(b?.voteCount?._hex) - Number(a?.voteCount?._hex))

console.log(sortedItems)
    return (
        <div>
            <div class="relative overflow-x-auto rounded-lg shadow-md ">
                <table class="w-4/5 text-sm text-left rounded-lg border-collapse border border-slate-400 0 border-collapse border border-slate-400  m-10 ml-36" style={{ border: "1px solid black" }}>
                    <thead class="text-xs text-white uppercase h-16 border-black bg-slate-60 dark:text-gray-400" >
                        <tr style={{ border: "1px solid black" }} className='bg-slate-600'>
                            <th scope="col" class="px-6 py-3">
                                Rank
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Party logo
                            </th>
                            <th scope="col" class="px-6 py-3">
                                profile
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Symbol
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Party Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                candidate name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Votes
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {!sortedItems ? <p>loading</p> : <>
                            {sortedItems?.map((item, index) => {
                                return (<tr class="border border-black">
                                    <th scope="row" class="px-6 py-4 font-medium text-xl text-white bg whitespace-nowrap dark:text-white">
                                        {index + 1}
                                    </th>
                                    <td class="px-6 py-4">
                                        {sortedItems ? <img alt='image' src={`data:image/png;base64,${arrayBufferToBase64(candidates?.find(obj => obj?.partyName === item?.name)?.partyImage?.data?.data)}`} className='bg-grey-800' style={{ borderRadius: '50%', width: "95px", height: '95px' }}></img>
                                            : "loading"}
                                    </td>
                                    <td class="px-6 py-4">
                                        {sortedItems ? <img alt='image' src={`data:image/png;base64,${arrayBufferToBase64(candidates?.find(obj => obj?.partyName === item?.name)?.candidateImage?.data?.data)}`} className='bg-grey-800' style={{ borderRadius: '50%', width: "95px", height: '95px' }}></img>
                                            : "loading"}
                                    </td>
                                    <th scope="row" class="px-6 py-4 font-medium text-xl text-white whitespace-nowrap dark:text-white">
                                        {sortedItems ? candidates?.find(obj => obj?.partyName === item?.name)?.partySymbol : "loading"}
                                    </th>
                                    <th scope="row" class="px-6 py-4 font-medium text-xl text-white whitespace-nowrap dark:text-white">
                                        {sortedItems ? candidates?.find(obj => obj?.partyName === item?.name)?.partyName : "loading"}
                                    </th>
                                    <th scope="row" class="px-6 py-4 font-medium text-xl text-white whitespace-nowrap dark:text-white">
                                        {sortedItems ? candidates?.find(obj => obj?.partyName === item?.name)?.candidateName : "loading"}
                                    </th>
                                    <th scope="row" class="px-6 py-4 font-medium text-xl text-white whitespace-nowrap dark:text-white">
                                        {Number(item?.voteCount._hex)}
                                    </th>
                                </tr>)
                            })}
                        </>
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Resulttable