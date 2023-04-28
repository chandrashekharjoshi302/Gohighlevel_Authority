import React, { useEffect, useState } from 'react';
import { SimpleGrid, Box, Text,  Button } from '@chakra-ui/react';

function WishlistPage() {
  const [showishlist, setWishlist] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    if (stored) {
      setWishlist(JSON.parse(stored));
    }
  }, []);

  const removeFromWishlist = (id) => {
    const updatedWishlist = showishlist.filter((product) => product.id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={4} >
      {showishlist?.map((product) => (
        <Box key={product.id} borderWidth="1px" borderRadius="lg" overflow="hidden" className='Box2' mb={20}>
        
          <Box p="6">
            <Box d="flex" alignItems="baseline">
              <Text fontWeight="semibold" fontSize="xl" mb="2">
                {product.fullNameLowerCase}
              </Text>
            </Box>
            <Text mb="2">{product.email}</Text>
            <Text mb="2">{product.phone}</Text>
            <Text mb="2">{product.companyName}</Text>
            <Button colorScheme="red" onClick={() => removeFromWishlist(product.id)}>
              Remove
            </Button>
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  );
}

export default WishlistPage;
