import Shorten from "../src/utils/Shorten";
import { shortenAddress } from "../src/utils/shortenAddress";

const TransactionsCard = ({ addressTo, addressFrom, timestamp, message, keyword, amount, url }) => {
  return (
    <div
      className="white-glassmorphism m-4 mb-20 flex h-56
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      rounded-2xl
      flex-col p-2 hover:shadow-3xl"
    >
      <div className="flex flex-col items-center w-full  mt-3">
        <div className="display-flex justify-start w-full mb-6 p-2">
          <a href={`https://rinkeby.etherscan.io/address/${addressFrom}`} target="_blank" rel="noreferrer">
            <p className="text-white mb-2 text-base">From: {shortenAddress(addressFrom)}</p>
          </a>
          <a href={`https://rinkeby.etherscan.io/address/${addressTo}`} target="_blank" rel="noreferrer">
            <p className="text-white mb-2 text-base">To: {shortenAddress(addressTo)}</p>
          </a>
          <p className="text-white text-base">Amount: {amount} ETH</p>
          {message && (
            <>
              <br />
              <p className="text-white text-base">Message: {message}</p>
            </>
          )}
          <a
            href={`https://rinkeby.etherscan.io/address/${addressTo}`}
            target="_blank"
            rel="noreferrer"
            className="text-white mt-4 text-base"
          >
            <p className=" text-sky-500 font-bold mt-4 text-base">Click to view on Etherscan</p>
          </a>
        </div>
        {/*<img src={"gifUrl" || "url"} alt="nature" className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover" />*/}
        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37c7da]  font-bold">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionsCard;
