const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.status(200).json({
    message: "Hello world"
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// NTOES: remove this folder if you dont need it or this code
// App.js 
// const router = useRouter();

//   const rootNavigationState = useRootNavigationState();
//   const navigatorReady = rootNavigationState?.key != null;

//   const API_URL = process.env.EXPO_PUBLIC_API_URL

//   const fetchData = async () => {
//     if (!API_URL) {
//       console.error("API URL is undefined.");
//       return;
//     }
    
//     try {
//       const response = await fetch(API_URL); 
//       const data = await response.json();
//       console.log("Received data:", data.message); 
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData()
//   }, [])

//   useEffect(() => {
//     if (!navigatorReady) return;
//     router.replace("/(tabs)/home");
//   }, [navigatorReady]);

//   return null;