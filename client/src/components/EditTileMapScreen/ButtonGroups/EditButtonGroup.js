import React, { useContext, useEffect, useState } from 'react'
import { Button, ButtonGroup } from '@chakra-ui/react'

const EditButtonGroup = (props) => {

    return(
        <ButtonGroup gap={0}>
            <Button size={'sm'}>🖌️</Button>
            <Button size={'sm'}>🗑️</Button>
            <Button size={'sm'}>✋</Button>
            <Button size={'sm'}>🎨</Button>
            <Button size={'sm'}>🎲</Button>
            <Button size={'sm'}>🌈</Button>
        </ButtonGroup>
    )
}

export default EditButtonGroup