import { extendTheme } from '@chakra-ui/react'
import '@fontsource/open-sans/300.css'
import '@fontsource/open-sans/400.css'
import '@fontsource/open-sans/700.css'

const config = {
  colors: {
    brand: {
      100 : "#ff3c00"
    },
  },
  fonts: {
    body : "Open Sans, san-serif"
  }
  ,
  styles: () => ({
    body: {
      bg : "gray.200"
    }
  })
}

const theme = extendTheme(config)

export default theme

