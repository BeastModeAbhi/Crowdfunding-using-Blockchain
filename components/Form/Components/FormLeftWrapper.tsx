import styled from 'styled-components';
import { FormState } from '../Form';
import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';


const FormLeftWrapper = () => {
  const Handler = useContext(FormState);

  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  

  const uploadToPinata = async (e: any) => {
    e.preventDefault();
    const info = Handler.story;
    if (info) {
    setUploadLoading(true);
      try {
        const formData = new FormData();
        formData.append("info", info);

        const response = await axios({
          method: "POST",
          url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
          data: formData,
          headers: {
            pinata_api_key: "9469171e190d349aed58",
            pinata_secret_api_key:
              "ac484cc0e88934b162e130a6de76eae79f55e42280ad88d7ff31856e44dd5e02",
            "Content-Type": "application/json",
          },
        });
        const InfoHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

        Handler.setImageUrl(InfoHash);
        setUploadLoading(false);
        setUploaded(true);
        Handler.setUploaded(true);
        toast.success("Information Uploaded Sucessfully");
      } catch (error) {
        console.log("Unable to upload to Pinata");
        setUploadLoading(false);

      }
    }
else{
  toast.warn("Please enter an story")
}
  }

  return (
    <FormLeft>
      <FormInput>
        <label>Campaign Title</label>
        <Input onChange={Handler.FormHandler} value={Handler.form.campaignTitle} placeholder='Campaign Title' name='campaignTitle'>
        </Input>
      </FormInput>
      <FormInput>
        <label>Story</label>
        <TextArea onChange={Handler.FormHandler} value={Handler.form.story} name="story" placeholder='Describe Your Story'>
        </TextArea>
        {uploadLoading == true ? <Button><TailSpin color='#fff' height={20} /></Button> :
        uploaded == false ? 
        <Button onClick={uploadToPinata}>
        Upload story to IPFS
        </Button>
        : <Button style={{cursor: "no-drop"}}>Story uploaded Sucessfully</Button>}
      </FormInput>
    </FormLeft>
  )
}

const FormLeft = styled.div`
  width: 48%;

`
const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'poppins';
  margin-top: 10px;
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
  width:100%;

`
const TextArea = styled.textarea`
  padding: 15px;
  background-color: ${(props) => props.theme.bgDiv};
  color: ${(props) => props.theme.color};
  margin-top: 4px;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: large;
  max-width: 100%;
  min-height: 150px;
  overflow-x: hidden;
  overflow-y: hidden;
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

export default FormLeftWrapper