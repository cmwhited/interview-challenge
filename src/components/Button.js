import { Button } from 'theme-ui'

/**
 * Build a common Button component
 * @param {Object} ButtonProps
 * @param {'button' | 'submit'} [ButtonProps.type = 'button'] the underlying button type
 * @param {string} ButtonProps.text the text to display in the button
 * @param {() => void} ButtonProps.handleClickEvent function to invoke when the button is clicked
 */
const CustomButton = ({ type = 'button', text, handleClickEvent }) => (
  <Button
    type={type}
    onClick={() => handleClickEvent()}
    px={8}
    py={6}
    backgroundColor="transparent"
    sx={{ border: '1px solid white', borderRadius: '5px', fontSize: '1.25rem' }}
  >
    {text}
  </Button>
)

export default CustomButton
