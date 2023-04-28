import { Box, Flex, Spacer, Link, Button, Text } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Link as RouterLink, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import WishlistPage from "./Components/Wishlist";
import ProductPage from "./Components/ProductPage";
import "./App.css"

export  function App() {
  return (
    <div className="App" >
    <Router>
      <Navbar />
      <Box px={4}>
        <Routes>
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/ProductPage" element={<ProductPage />} />
        </Routes>
      </Box>
    </Router>
    <Text fontSize='6xl' color='green.600'>GoHighLevel Api Assignment</Text>
    </div>
  );
};

export default App;
