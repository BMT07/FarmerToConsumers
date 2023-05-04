import React from 'react'
import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    HStack,
    IconButton,
    Input,
    Text,
    SkeletonText,
    Grid,
  } from '@chakra-ui/react';
  import { FaLocationArrow, FaTimes } from 'react-icons/fa';
  
  import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
  } from '@react-google-maps/api';
  import { useState } from 'react';
  import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { DELIVER_YMODIFY } from '../../controller/actionDelivery';
  
  const center = { lat: 36.806392, lng: 10.180934 };


function MapDest({handleNext}) {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey:"AIzaSyCdI6T6SqrYeBzHz81prMtk1HneAPLpkxk",
        libraries: ['places'],
      });
      const history=useHistory()
      const [map, setMap] = useState(/** @type google.maps.Map */ (null));
      const [directionsResponse, setDirectionsResponse] = useState('');
      const [distance, setDistance] = useState('');
      const [duration, setDuration] = useState('');
      const [fee, setFee] = useState('');
      const dispatch=useDispatch()
    
      const originRef = useRef();
      const destinationRef = useRef();
    
      if (!isLoaded) {
        return <SkeletonText startColor="green.500" endColor="green.200" />;
      }
    
      async function calculateRoute() {
        if (originRef.current.value === '' || destinationRef.current.value === '') {
          return;
        }
        //eslint-disable-next-line no-undef
        const directionService = new google.maps.DirectionsService();
        const results = await directionService.route({
          origin: originRef.current.value,
          destination: destinationRef.current.value,
          //eslint-disable-next-line no-undef
          travelMode: google.maps.TravelMode.DRIVING,
        });
        setDirectionsResponse(results);
        setDistance(results.routes[0].legs[0].distance.text);
        setDuration(results.routes[0].legs[0].duration.text);
        //console.log(distance > 5);
        //console.log(distance);
        //console.log(results.routes[0].legs[0].distance.value / 1000 > 5);
        const distValue = results.routes[0].legs[0].distance.value / 1000;
        if (distValue < 5) {
          setFee(5);
        } else if (distValue > 5 && distValue < 10) {
          setFee(7);
        } else if (distValue > 10 && distValue < 17) {
          setFee(12);
        } else setFee(17);
      }
    
      function clearRoute() {
        setDirectionsResponse(null);
        setDistance('');
        setDuration('');
        setFee('');
        originRef.current.value = '';
        destinationRef.current.value = '';
      }
  return (
    <Grid container spacing={3}>
    <Flex
    position="relative"
    flexDirection="column"
    alignItems="center"
    h="100vh"
    w="100vw"
  >
    <Box position="absolute" left={0} top={0} h="100%" w="100%">
        <Box
          p={4}
          borderRadius="lg"
          mt={4}
          bgColor="white"
          shadow="base"
          minW="container.md"
          //zIndex="modal"
          zIndex="2"
          maxWidth={100}
          
        >
          <HStack spacing={2} justifyContent="space-between">
            <Box flexGrow={1}>
              <Autocomplete zIndex="99">
                <Input
                  type="text"
                  placeholder="Origin"
                  ref={originRef}
                  //componentRestrictions={{ country: 'TN', postalCode: '1111' }}
                />
              </Autocomplete>
            </Box>
    
            <Autocomplete zIndex="999">
              <Input type="text" placeholder="Destination" ref={destinationRef} />
            </Autocomplete>
    
            <ButtonGroup>
              <Button colorScheme="green" type="submit" onClick={calculateRoute}>
                Calculate Route
              </Button>
              <IconButton
                aria-label="center back"
                icon={<FaTimes />}
                onClick={clearRoute}
              />
            </ButtonGroup>
          </HStack>
          <HStack spacing={4} mt={4} justifyContent="space-between">
            <Text>Distance: {distance}</Text>
            <Text>Duration: {duration}</Text>
            {fee && <Text>Delivery Fee: {fee}Dt</Text>}
            <IconButton
              aria-label="center back"
              icon={<FaLocationArrow />}
              isRound
              onClick={() => map.panTo(center)}
            />
            {fee &&(
            <Button onClick={()=>{handleNext();dispatch(DELIVER_YMODIFY(fee))}}>
                Next
            </Button>)}
          </HStack>
        </Box>
      {/* Google Map Box */}
      <GoogleMap
        center={center}
        zoom={10}
        mapContainerStyle={{ width: '50%', height: '75%' }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        onLoad={(map) => {
          setMap(map);
        }}
      >
        <Marker position={center} />
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
    </Box>

  </Flex>
  
  </Grid>
  )
}

export default MapDest