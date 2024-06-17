'use client'

import styled from 'styled-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


interface HeaderNavLinksProps {
  active: boolean;
}

const HeaderNav = () => {
  const pathname = usePathname();

  return (
    <HeaderNavWrapper>
      <Link href="/" passHref>
        <HeaderNavLinks active={pathname === "/"} >
          Campaigns
      </HeaderNavLinks>
      </Link>
      <Link href="/createCampaign" passHref>
        <HeaderNavLinks active={pathname === "/createcampaign"}>
          Create Campaign
        </HeaderNavLinks>
      </Link>
    </HeaderNavWrapper>
  )
}

const HeaderNavWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.bgDiv};
  padding: 6px;
  height: 50%;
  border-radius: 10px;
  gap: 20px;
`
const HeaderNavLinks = styled.div<HeaderNavLinksProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => (props.active ?  props.theme.bgSubDiv : props.theme.bgDiv)};
  height: 100%;
  font-family: 'Roboto';
  margin: 7px;
  border-radius: 10px;
  padding: 0 5px 0 5px;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
  font-size: small;
`

export default HeaderNav