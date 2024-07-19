import RestaurentCard from "./RestaurantCard";
import {useState,useEffect} from "react";
import Shimmer from "./Shimmer";
  const Body = () => {
   const [ListOfRestaurants,SetListOfRestaurants]=useState([]);

   const [searchText, setSearchText] = useState([]);
   
   const [filteredRestaurant,setFilteredRestaurant] = useState([]);

   useEffect(()=>{
      fetchData();
  },[]);

  const fetchData = async()=>{
   const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.406498&lng=78.47724389999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
   );
   const json=await data.json();


   SetListOfRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
   setFilteredRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);

  };

/*if(ListOfRestaurants.length===0)
   {
      //conditional rendering
      return <Shimmer/>
   } */
    return ListOfRestaurants.length === 0 ? (<Shimmer/>) : (
       <div className="body">
          <div className="filter">
            <div className="search">
               <input type="text" 
               className="search-box"
               value={searchText}
               onChange={(e)=>{
                  setSearchText(e.target.value);
               }}
               />
               <button
               onClick={()=>{
                  //filter the restaurants according to search input and render UI
                  const filteredRestaurant = ListOfRestaurants.filter((res)=>
                    res.data.name.toLowerCase().includes(searchText.toLowerCase())
                  );

                  SetFilteredRestaurant(filteredRestaurant);
               }}
               >Search</button>
            </div>
           <button
             className="filter-btn"
             onClick={()=> {
                 const filteredList=ListOfRestaurents.filter(
                  (res)=>res?.data?.avgRating>4
                 ); 
                 SetListOfRestaurants(filteredList);
                    }} >
            Top Rated Restaurants

           </button>
            
          </div>
          <div className="res-container"> 
            {filteredRestaurant.map((restaurant)=>(
               <RestaurentCard key={restaurant.info.id} resData={restaurant}/>
            ))}
 
           
           
            
          </div>
       </div>
    );
 };
 export default Body;
 