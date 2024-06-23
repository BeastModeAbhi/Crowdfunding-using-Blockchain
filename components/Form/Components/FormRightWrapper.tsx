"use client";

import styled from 'styled-components';
import { FormState } from '../Form';
import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { IPFSHTTPClient } from 'ipfs-http-client';
import { TailSpin } from 'react-loader-spinner';
import axios from 'axios';
import Router from 'next/router';
import { debug } from 'console';
import { json } from 'stream/consumers';
import { arch } from 'os';

/*Upload to Pinata ipfs function
const uploadToPinata = async (e:any) => {
  e.preventDefault();
  setUpLoading(true);
  const file = Handler.image;
  if (file) {
    try {
      const formData = new FormData();
      formData.append("file",file);

      const response = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          "pinata_api_key": '2bc7a2127d0bcffd6962',
          "pinata_secret_api_key": '6219f0d5051d849136fbba9e7f608b489390a1eeb55dbc6c05a476443c2a570e',
          "Content-Type": "multipart/form-data",
        },
      });
      const ImgHash = 'https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}';
      Handler.setImageUrl(ImgHash);
        setUploadLoading(false);
        setUploaded(true);
        Handler.setUploaded(true);
        toast.success("Files Uploaded Sucessfully");

    } catch (error) {
      console.log("Unable to upload to Pinata");
    }
  }
};*/

/*Create fuction
const createNFT = async (story) => {
  const data = JSON.stringify({story});

  try{
    const response = await axios({
      method: "POST",
      url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      data: data,
      headers: {
        "pinata_api_key": '2bc7a2127d0bcffd6962',
        "pinata_secret_api_key": '6219f0d5051d849136fbba9e7f608b489390a1eeb55dbc6c05a476443c2a570e',
        "Content-Type": "application/json",
      },
    });
    const url = 'https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}';
    console.log(url);

    await createSale(url,story);
    Router.push("/searchPage");
  }catch (error) {
    setError("Error while creating campaign");
    setOpenError(true);
  }
}*/

/*Infura ipfs
const projectId = '38b8a9885237414db7336317f044e820'
const projectSecret = 'xKqJ0w7xu9j6wzYykYLnBl1ietGXUu1hEpSgLaGnY7+I52XPwNrPSg'
const auth = 'Basic ' + Buffer.from(projectId + ":" + projectSecret).toString('base64')

const client = IPFSHTTPClient({
  host:'ipfs.infura.io',
  port:5001,
  protocol: 'https',
  headers: {
    authorization: auth
  }
})*/

const FormRightWrapper = () => {
  const Handler = useContext(FormState);

  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const uploadToPinata = async (e: any) => {
    e.preventDefault();
    const file = Handler.image;
    if (file) {
    setUploadLoading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios({
          method: "POST",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: "Your_Api_Key",
            pinata_secret_api_key:
              "Your_Secret_Key",
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

        Handler.setImageUrl(ImgHash);
        setUploadLoading(false);
        setUploaded(true);
        Handler.setUploaded(true);
        toast.success("Files Uploaded Sucessfully");
      } catch (error) {
        console.log("Unable to upload to Pinata");
        setUploadLoading(false);

      }
    }
else{
  toast.warn("Please select a file")
}
    
    /*if(Handler.form.story !== "") {
      try {
        const added = await client.add(Handler.form.story);
        Handler.setStoryUrl(added.path)
      } catch (error) {
        toast.warn(`Error Uploading Story`);
      }
    }


      if(Handler.image !== null) {
          try {
              const added = await client.add(Handler.image);
              Handler.setImageUrl(added.path)
          } catch (error) {
            toast.warn(`Error Uploading Image`);
          }
      }

      setUploadLoading(false);
      setUploaded(true);
      Handler.setUploaded(true);
      toast.success("Files Uploaded Sucessfully")
    }*/
  
}

  return (
    <FormRight>
      <FormInput>
        <FormRow>
          <RowFirstInput>
            <label>Required Amount</label>
            <Input onChange={Handler.FormHandler} value={Handler.form.requiredAmount} name='requiredAmount' type={'number'} placeholder='Required Amount'></Input>
          </RowFirstInput>
          <RowSecondInput>
            <label>Choose Category</label>
            <Select onChange={Handler.FormHandler} value={Handler.form.category} name='category'>
              <option>Education</option>
              <option>Health</option>
              <option>Animal</option>
            </Select>
          </RowSecondInput>
        </FormRow>
      </FormInput>
       {/* Image */}
        <FormRight>
        <label>Select Image</label>
        <Image alt='dapp' onChange={Handler.ImageHandler} type={'file'} accept='image/*'>
        </Image>
        </FormRight>
        {uploadLoading == true ? <Button><TailSpin color='#fff' height={20} /></Button> :
        uploaded == false ? 
        <Button onClick={uploadToPinata}>
          Upload Files to IPFS
        </Button>
        : <Button style={{cursor: "no-drop"}}>Files uploaded Sucessfully</Button>
      }
      <Button onClick={Handler.startCampaign}>
        Start Campaign
      </Button>
    </FormRight>
  )
}

const FormRight = styled.div`
  width: 45%;
`
const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'poppins';
  margin-top: 10px;
`

const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const Input = styled.input`
  padding: 15px;
  background-color: ${(props) => props.theme.bgDiv};
  color: ${(props) => props.theme.color};
  margin-top: 4px;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: large;
  width: 100%;
`

const RowFirstInput = styled.div`
  display: flex;
  flex-direction: column;
  width:45%;
`

const RowSecondInput = styled.div`
  display: flex;
  flex-direction: column;
  width:45%;
`

const Select = styled.select`
  padding: 15px;
  background-color: ${(props) => props.theme.bgDiv};
  color: ${(props) => props.theme.color};
  margin-top: 4px;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: large;
  width: 100%;
`

const Image = styled.input`
  background-color:${(props) => props.theme.bgDiv} ;
  color:${(props) => props.theme.color} ;
  margin-top:4px;
  border:none ;
  border-radius:8px ;
  outline:none;
  font-size:large;
  width:100% ;

  &::-webkit-file-upload-button {
    padding: 15px ;
    background-color: ${(props) => props.theme.bgSubDiv} ;
    color: ${(props) => props.theme.color} ;
    outline:none ;
    border:none ;
    font-weight:bold ;
  }  
`

const Button = styled.button`
  display: flex;
  justify-content:center;
  width:100% ;
  padding:15px ;
  color:white ;
  background-color:#00b712 ;
  background-image:
      linear-gradient(180deg, #00b712 0%, #5aff15 80%) ;
  border:none;
  margin-top:30px ;
  cursor: pointer;
  font-weight:bold ;
  font-size:large ;
`

export default FormRightWrapper
