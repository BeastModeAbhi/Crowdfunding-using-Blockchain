"use client"
import React,{useState,useEffect} from 'react'
import Detail from '../detail'
import {ethers} from 'ethers';
import Campaign from '../../artifacts/contracts/Campaign.sol/Campaign.json'

const Page =  ({params}:{params: {campaignId:string}}) => {
    const campaignId = params.campaignId
    const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL
      );
      const contract = new ethers.Contract(
        campaignId,
        Campaign.abi,
        provider
      );
      const [data,setData] = useState<any>({})
      const [donationData,setDonationData] = useState<any[]>([])
      const [loading,setLoading] = useState<boolean>(false)

      useEffect(() => {     
        const fetchContract = async () => {
        setLoading(true)
      const title = await contract.title();
      const requiredAmount = await contract.requiredAmount();
      const image = await contract.image();
      const storyUrl = await contract.story();
      const owner = await contract.owner();
      const receivedAmount = await contract.receviedAmount();
      const Donations = contract.filters.donated();
      const AllDonations = await contract.queryFilter(Donations);
      const Data = {
          address: campaignId,
          title, 
          requiredAmount: ethers.utils.formatEther(requiredAmount), 
          image, 
          receivedAmount: ethers.utils.formatEther(receivedAmount), 
          storyUrl, 
          owner,
      }
      setData(Data)
      const DonationsData =  AllDonations.map((e) => {
        return {
          donar: e.args!.donar,
          amount: ethers.utils.formatEther(e.args!.amount),
          timestamp : parseInt(e.args!.timestamp)
      }});
      setDonationData(DonationsData)
      setLoading(false)
    }
    fetchContract()
},[])
  return (
    <>
    {loading ? <div>loading</div> :<Detail Data={data} DonationsData={donationData} />}
    </>
  )
}

export default Page