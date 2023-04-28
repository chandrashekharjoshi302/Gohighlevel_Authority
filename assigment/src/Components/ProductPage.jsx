

import React, { useState, useEffect } from "react";
import { SimpleGrid, Text, Box, Button } from "@chakra-ui/react";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [addWishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const url =
        "https://rest.gohighlevel.com/v1/contacts/lookup?email=john@deo.com&phone=+491971259866";
      const api_key =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6IkpOVEpTV04ya0tkRVZkMElFbEZhIiwiY29tcGFueV9pZCI6ImJmb1Q3MkNWcm9oMlg4ZWZPUmdRIiwidmVyc2lvbiI6MSwiaWF0IjoxNjYxNDE2NzQzNTcxLCJzdWIiOiJQcVJEWDZqMjdXempXRUNsQm92eCJ9.u6WPtyudfB9R4nLnLbBZ6i9KquDeK6WnIOZxKAeE9Hg";

      try {
        const response = await fetch(`${url}`, {
          headers: { Authorization: `Bearer ${api_key}` }
        });
        const data = await response.json();
        setProducts(data.contacts);
        console.log(data.contacts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchContacts();
  }, );

  const addToWishlist = (product) => {
    setWishlist([...addWishlist, product]);
    localStorage.setItem("wishlist", JSON.stringify([...addWishlist, product]));
    alert("Product successfully added to wishlist!");
  };


  const updateCustomField = async (contactId) => {
    const api_key =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6IkpOVEpTV04ya0tkRVZkMElFbEZhIiwiY29tcGFueV9pZCI6ImJmb1Q3MkNWcm9oMlg4ZWZPUmdRIiwidmVyc2lvbiI6MSwiaWF0IjoxNjYxNDE2NzQzNTcxLCJzdWIiOiJQcVJEWDZqMjdXempXRUNsQm92eCJ9.u6WPtyudfB9R4nLnLbBZ6i9KquDeK6WnIOZxKAeE9Hg";
    const customFieldId = 1234; // Replace with the actual custom field ID

    const url = `https://rest.gohighlevel.com/v1/contacts/${contactId}`;
    const body = {
      customFields: [
        {
          customFieldId: customFieldId,
          value: "TEST"
        }
      ]
    };

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${api_key}`
        },
        body: JSON.stringify(body)
      });
      const data = await response.json();
      console.log(data);
      alert("Product successfully updated!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box p="5">
      <SimpleGrid columns={[1, 2, 3]} spacing="40px">
        {products.map((product) => (
          <Box
            key={product.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="base"
            position="relative"
          >
            <Box position="absolute" top="1" right="1">
              <Button onClick={() => addToWishlist(product)}>
                Add to Wishlist
              </Button>
            </Box>
            <Box p="6">
              <Box d="flex" alignItems="baseline">
                <Text fontWeight="bold" fontSize="2xl" mr="2">
                  {product.name}
                </Text>
              </Box>
              <Box mt="2">
                <Text fontWeight="semibold" fontSize="lg">
                  {product.phone}
                </Text>
              </Box>
              <Box mt="2">
                <Text fontWeight="semibold" fontSize="lg">
                  {product.email}
                </Text>
              </Box>
              <Box mt="2">
                <Text fontWeight="semibold" fontSize="lg">
                  {product.companyName}
                </Text>
              </Box>
              <Box mt="2">
                <Text fontWeight="semibold" fontSize="lg">
                  {product.address}
                </Text>
              </Box>
              <Box mt="2">
                <Button
                  onClick={() => updateCustomField(product.id)}
                  colorScheme="blue"
                  variant="solid"
                >
                  Update Custom Field
                </Button>
              </Box>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default ProductPage;