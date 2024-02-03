import React from 'react'
import {
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
    Box,
    useMediaQuery,
  } from '@chakra-ui/react'

const steps = [
    { title: 'One', description: 'Details' },
    { title: 'Two', description: 'Confirm' },
    { title: 'Three', description: 'Payment' },
  ]
  
const  Example = ({current}) => {
    const { activeStep } = useSteps({
      index: current,
      count: steps.length,
    })

    const [isSmallerThan600] = useMediaQuery('(max-width: 600px)')
    var style = {};
    if(isSmallerThan600){
      style = {
        fontSize: "0.5rem"
      }
    }
  
    return (
      <Stepper size='md' colorScheme='purple' index={activeStep}>
        {steps.map((step, index) => (
          <Step key={index} >
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>
  
            <Box flexShrink='0'>
              <StepTitle style = {style}>{step.title}</StepTitle>
              <StepDescription style = {style}>{step.description}</StepDescription>
            </Box>
  
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
    )
  }

  export default Example