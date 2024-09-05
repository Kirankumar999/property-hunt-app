import React from 'react'
import PropertyCard from '@/components/PropertyCard'

async function fetchProperties() {
  try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/properties`);
      console.log("This is response recieved from Component", res);
      if (!res.ok) {
        throw new Error('Failed to Fetch Data');
      }
      return res.json();
  } catch (error) {
    console.log(error);
  }
}
const propertiesPage = async () => {
  const properties = await fetchProperties();
  return (
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
        {!properties ? (<p> No Properties</p>) :
        (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard
                key={property._id}
                propertyKey ={property._id}
                property={property}
                />
              ))}
          </div>
            )}
        </div>
      </section>
  )
}

export default propertiesPage