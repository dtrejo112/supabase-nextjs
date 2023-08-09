import Image from 'next/image'
import logo from '../../public/headache.png'
import { Stack } from '@mui/material'

export default function Logo() {
    return (
        <>
       <Stack 
              alignItems="center"
              direction='row'
              spacing={{ xs: 1, sm: 2, md: 4 }}>
        <Image
            src={logo}
            alt="Logo for application"
            width={56}
            height={56}
            
            />
            <h2> Migraine Buddy </h2>
       </Stack>
       
        </>
    )
}