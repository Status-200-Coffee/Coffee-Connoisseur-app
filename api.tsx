// import axios from 'axios'

// const coffeeConnoisseurApi = axios.create({
//     baseURL: "https://coffee-connoisseur-api.onrender.com/api",
// })

// type city = {city: string}


// export const fetchShopsByCity = (props: city) => {
//     return coffeeConnoisseurApi.get<Array<object>>(`/shops/${props.city}`).then(({ data }) => {
//         console.log(data)
//         return data
//     })
// }