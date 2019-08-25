import React from 'react';
import styled from 'styled-components';

const AgendaWrapper = styled.div`
  border: 2px solid #000000;
`;

const AgendaItemWrapper = styled.a`
  padding: 12px 14px 0 14px;
  margin-bottom: -1px;
  text-decoration: none;
  display: block;
`;

const InnerWrapper = styled.div`
  flex: 1;
  flex-direction: row;
  display: flex;
  text-decoration: none;
  align-items: center;
  border-bottom: 1px solid #000;
  padding-bottom: 10px;
`;

const InfoColumn = styled.div`
`;

const TitleWrapper = styled.div`
  padding: 4px 40px 4px 10px;
  flex-direction: row;
  flex-grow: 1;
  text-align: left;
  align-items: space-between;
  position: relative;
`;

const SmallText = styled.p`
  font-size: 10px;
  color: #000000;
  text-align: left;
`;

const BigText = styled.p`
  font-size: 16px;
  color: #000000;
  font-style: italic;
  font-weight: 600;
  display: inline-block;
`;

const MoreButton = styled.a`
  font-size: 14px;
  background-color: #000000;
  color: #ffffff;
  padding: 4px 50px;
  text-decoration: none;
`;

const Live = styled.p`
  font-size: 14px;
  color: #06d606;
  display: inline-block;
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -9px;
`;

const Wrapper = styled.div`
  text-align: center;
`;

export const Agenda = ({ agenda, showMore, style }) => {
  return (
    <Wrapper style={style}>
      <AgendaWrapper>
        {agenda.map((event) => {
          return (
            <AgendaItemWrapper key={event.id}>
              <InnerWrapper>
                <InfoColumn>
                  <SmallText>{`${event.timeFrom}-${event.timeTo}`}</SmallText>
                  <SmallText>{event.area}</SmallText>
                </InfoColumn>
                <TitleWrapper>
                  <BigText>{event.title}</BigText>
                  {!!event.isNow && <Live>Live</Live>}
                </TitleWrapper>
              </InnerWrapper>
            </AgendaItemWrapper>
          )
        })}
      </AgendaWrapper>
      {!!showMore &&
      <MoreButton href="/agenda">
        more...
      </MoreButton>}
    </Wrapper>
  )
};
