import React from "react";
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
  MDBContainer,
} from "mdbreact";

const CarouselPage = () => {
  return (
    <MDBContainer className="mdbcontainer">
      <MDBCarousel
        interval={4000}
        activeItem={1}
        length={5}
        showControls={false}
        showIndicators={false}
        className="z-depth-1"
        slide={true}
        onHoverStop={false}
      >
        <MDBCarouselInner>
          <MDBCarouselItem itemId="1">
            <MDBView>
              <img
                className="d-block w-100 home__image"
                src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
                alt="First slide"
              />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="2">
            <MDBView>
              <img
                className="d-block w-100 home__image"
                src="https://images-eu.ssl-images-amazon.com/images/G/31/IMG19/Furniture/Herotator/WFH/Offer/V2/WFH-Herotator-hero_1500x600._CB405299564_.jpg"
                alt="Second slide"
              />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="3">
            <MDBView>
              <img
                className="d-block w-100 home__image"
                src="https://images-eu.ssl-images-amazon.com/images/G/31/img19/AmazonPay/Boson/Sid/CCBP/Nov/BAU/Credit-Card-Bill_1500x600_without._CB415288872_.jpg"
                alt="Third slide"
              />
            </MDBView>
          </MDBCarouselItem>

          <MDBCarouselItem itemId="4">
            <MDBView>
              <img
                className="d-block w-100 home__image"
                src="https://images-eu.ssl-images-amazon.com/images/G/31/AmazonVideo/2020/X-site/SingleTitle/Chhalaang/nobranding/1500x600_Hero-Tall_ft._CB415559866_.jpg"
                alt="Forth slide"
              />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="5">
            <MDBView>
              <img
                className="d-block w-100 home__image"
                src="https://images-eu.ssl-images-amazon.com/images/G/31/img17/Pantry/November2020/healthnwelnessfest/healthandwellnessfest1500x600__1._CB415603054_.jpg"
                alt="Fifth slide"
              />
            </MDBView>
          </MDBCarouselItem>
        </MDBCarouselInner>
      </MDBCarousel>
    </MDBContainer>
  );
};

export default CarouselPage;
