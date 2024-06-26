import React, { useEffect, useState } from 'react';
import Layout from '@src/Layout';
import { handleErrors } from '@utils/fetchHelper';
import BookingWidget from './BookingWidget';
import '../stylesheets/property.scss';

const Property = (props) => {

  const [propertyData, setPropertyData] = useState(
  {
    property: {},
    loading: true,
  })

  const getPropertyData = () => {
    fetch(`/api/properties/${props.property_id}`)
    .then(handleErrors)
    .then(data => {
      setPropertyData({
        property: data.property,
        loading: false,
      })
    })
  }

  const {
    id,
    title,
    description,
    city,
    country,
    property_type,
    price_per_night,
    max_guests,
    bedrooms,
    beds,
    baths,
    image_url,
    user,
   } = propertyData.property

  useEffect(() => {
    getPropertyData();
  }, [])

  return (
    <Layout>
      {user == undefined && <p className="text-center">loading...</p>}
      {user !== undefined && 
        <div>
          <div className="property-image mb-3" style={{ backgroundImage: `url(${image_url})` }} />
          <div className="container">
            <div className="row">

              <div className="info col-12 col-lg-7">
                <div className="mb-3">
                  <h3 className="mb-0">{title}</h3>
                  <p className="text-uppercase mb-0 text-secondary"><small>{city}</small></p>
                  <p className="mb-0"><small>Hosted by <b></b>{user.username}</small></p>
                </div>
                <div>
                  <p className="mb-0 text-capitalize"><b>{property_type}</b></p>
                  <p>
                    <span className="me-3">{max_guests} guests</span>
                    <span className="me-3">{bedrooms} bedroom</span>
                    <span className="me-3">{beds} bed</span>
                    <span className="me-3">{baths} bath</span>
                  </p>
                </div>
                <hr />
                <p>{description}</p>
              </div>

              <div className="col-12 col-lg-5">
                <BookingWidget property_id={id} price_per_night={price_per_night} />
              </div>

            </div>
          </div>
        </div>
      }
    </Layout>
  )
}

export default Property;