export interface Hotel {
    _id: string,
    title: string,
    location: string,
    rating: string | number,
    review: string | number,
    image: any,
    country: string,
    country_id: string,
    description: string,
    price: any,
    availability: {
      start: any,
      end: any,
    },
    coordinates:{
      latitude: any,
      longitude: any
    }
}

export type Item = {
    _id: string,
    title: string,
    location: string,
    rating: string | number,
    review: string | number,
    image: any
}

export interface Place {
    _id: string,
    title: string,
    location: string,
    rating: string | number,
    review: string | number,
    country: string,
    image: any,
    description: string,
    country_id: string,
}

export type ReviewProps = {
    review: {
        _id: string,
        place: string,
        review: string,
        rating: number,
        user: {
            username: string,
            profile: any,
        }
        updatedAt: any
    }
}

export type CountryProps ={
    item: {
      _id: string,
      country: string,
      image: any,
      description: string,
      region: string
    }
  }