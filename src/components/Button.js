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
    backgroundColor="transparent"
    sx={{
      border: (theme) => `1px solid ${theme.colors.lightPurple}`,
      fontWeight: (theme) => theme.fontWeights.heading,
      borderRadius: '4px',
      fontSize: '0.9rem',
      paddingY: '1rem',
      paddingX: '2rem',
      ':hover': {
        textShadow: (theme) =>
          `0 0 1rem ${theme.colors.textShadowPrimary}, 0 0 2rem ${theme.colors.textShadowSecondary}`,
        boxShadow: (theme) => `0 0 1.5rem ${theme.colors.lightPurple}`,
      },
    }}
  >
    {text}
  </Button>
)

export default CustomButton
