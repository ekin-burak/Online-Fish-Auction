import React from 'react'
import Navbar from '../components/Navbar'
import styled from 'styled-components';
import Avatar from '../images/defaultUserAvatar.jpeg';
import { useState, useEffect } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EditIcon from '@mui/icons-material/Edit';
import useFetch from "./useFetch";


const Container = styled.div`
    margin-top: 60px;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
   
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 10px;
`
const ProfileContainer = styled.div`
    display: flex;
    flex-direction: row;
    background-color: #fff;  
    padding: 30px;
    margin-top: 20px;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    
`
const ConstInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 30px;
    padding-left: 30px;
    width: 50 vh;
    
`
const ConstInfo = styled.div`
    display: flex;
    align-items: flex-end;
    margin: 15px;
    padding: 5px;
    
`
const ConstTitle = styled.h2`
    color: #35858B;;
    /*text-decoration: underline;
    text-decoration-color: #35858B;*/
    margin-right: 10px;
`
const ConstContent = styled.h3`
    color: #222;
`
const PasswordButton = styled.button`
    padding-left: 45px;
    border-radius: 10px;
    font-weight: 700;
    font-size: 18px;
    padding: 10px 20px;
    width: 80 vh;
    display:flex;
    align-items: center;
    justify-content: center;
    margin: 15px;
    padding: 5px;
    background-color: #072227;
    border: 2px solid #4FBDBA;
    color: #fff;
    &:hover {
    background-color: #4FBDBA;
    border: 2px solid #AEFEFF;
        
  }
`
const Table = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const TableFrame = styled.table`
  border: 2px solid forestgreen;
  width: 800px;
`
const TableRow = styled.tr`
  border: 2px solid forestgreen;
  width: 800px;
  hover: {background-color: #4FBDBA;}
`
const TableHeaders = styled.th`
  border-bottom: 1px solid black;
`
const TableContents = styled.td`
  border-bottom: 1px solid black;
`


const Image = styled.img`
`

const mail = localStorage.getItem("userMail")
const id = localStorage.getItem("id")

const UserInfo = () => {

  const [passChangeForm, setPassChangeForm] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [myFishes, setMyFishes] = useState([]);

  //const { data: userInfo } = useFetch('http://localhost:8080/users/mail/' + mail);
  //const { data: myFishes } = useFetch('http://localhost:8080/package/' + id);

  //initialize userInfo
  useEffect(() => {
    fetch('http://localhost:8080/users/mail/' + mail)
      .then(response => response.json())
      .then(data => {
        setUserInfo(data);
      })
  }, [])

  useEffect(() => {
    fetch('http://localhost:8080/package/' + id)
      .then(response => response.json())
      .then(data => {
        setMyFishes(data);
      })
  }, [])


  return (
    <Container>
      <Navbar />
      <Wrapper>

        <ProfileContainer>
          <Image src={Avatar} />
          {console.log(userInfo)}
          {console.log(myFishes)}
          <ConstInfoContainer>
            <ConstInfo><ConstTitle></ConstTitle><ConstContent>{userInfo.name} {userInfo.surname} </ConstContent></ConstInfo>
          </ConstInfoContainer>
        </ProfileContainer>


        <ProfileContainer>
          <ConstInfoContainer>
            <ConstInfo><ConstTitle><EmailIcon fontSize='large' />Email: </ConstTitle><ConstContent>{userInfo.userMail} </ConstContent></ConstInfo>
            <ConstInfo><ConstTitle><HomeIcon fontSize='large' />Adres: </ConstTitle><ConstContent>{userInfo.address}</ConstContent></ConstInfo>
            <ConstInfo><ConstTitle><LocalPhoneIcon fontSize='large' />Telefon Numarası: </ConstTitle><ConstContent>{userInfo.phoneNum}</ConstContent></ConstInfo>
            {/* <PasswordButton onClick={() => setPassChangeForm(true)}>Change Password <EditIcon style={{ paddingLeft: "5px" }} /></PasswordButton>
            <PassChangeForm trigger={passChangeForm} setTrigger={setPassChangeForm} userId={id} /> */}
          </ConstInfoContainer>
        </ProfileContainer>

        <ProfileContainer>
          <ConstInfoContainer>
            <ConstInfo><ConstTitle>Satın Aldığım Deniz Ürünleri</ConstTitle></ConstInfo>
            <Table>
              <TableFrame>
                <TableRow>

                  <TableHeaders>Balık Türü</TableHeaders>
                  <TableHeaders>Kilosu</TableHeaders>
                  <TableHeaders>Son Fiyat</TableHeaders>
                  <TableHeaders>Satıcı</TableHeaders>
                </TableRow>

                {myFishes.map(fish => (
                  <TableRow key={fish.id}>
                    <TableContents>{fish.fishType}</TableContents>
                    <TableContents>{fish.fishAmount}</TableContents>
                    <TableContents>{fish.soldPrice}</TableContents>
                    <TableContents>{fish.sellerName}</TableContents>
                  </TableRow>
                ))}
              </TableFrame>
            </Table>
          </ConstInfoContainer>
        </ProfileContainer>


      </Wrapper>
    </Container>


  )
}

export default UserInfo



