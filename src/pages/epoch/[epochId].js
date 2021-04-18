/** @jsxImportSource theme-ui */
import Image from 'next/image'
import Link from 'next/link'
import { Heading, Box, Flex, IconButton } from 'theme-ui'

import { initApolloClient } from '../../apollo/client'
import { EPOCH_ID_LIST_QEURY, EPOCH_QUERY } from '../../apollo/queries'

/**
 * Build the Epoch details page
 * @param {Object} EpochDetailsPageProps
 * @param {import('../../apollo/epoch.queries').Epoch} EpochDetailsPageProps.epoch
 */
const EpochDetailsPage = ({ epoch }) => (
  <Box sx={{ width: '100%' }}>
    <Flex
      as="div"
      sx={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <Link href="/">
        <IconButton
          aria-label="return to Epoches list"
          sx={{
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '999999px',
            ':hover': { backgroundColor: (theme) => theme.colors.primaryPurple },
            transform: 'rotate(90deg)',
          }}
        >
          <Image src="/Direction-Down.svg" width={15} height={15} />
        </IconButton>
      </Link>
      <div sx={{ marginLeft: '1em', marginRight: '2em' }}>
        <Image src="/Product-Engineering.svg" width={81} height={81} />
      </div>
      <Heading
        as="h1"
        color="primary"
        sx={{
          fontSize: '4rem',
          textShadow: (theme) =>
            `0 0 1rem ${theme.colors.textShadowPrimary}, 0 0 2rem ${theme.colors.textShadowSecondary}`,
        }}
      >
        {epoch?.id}
      </Heading>
    </Flex>
  </Box>
)

/**
 * Retrieve a list of the IDs of the Epoches from the API.
 * Use this list to build the static epoch details pages.
 * This happens server-side, so the useQuery cannot be used here;
 * to get around this and get the data, grabbing an instance to the
 * ApolloClient directly and using it to pull id list
 * @returns the paths for the epoch details pages with the id
 */
export const getStaticPaths = async () => {
  const client = initApolloClient({})
  const { data } = await client.query({
    query: EPOCH_ID_LIST_QEURY,
    fetchPolicy: 'cache-first',
  })

  const paths = (data?.epoches ?? []).map((epoch) => ({
    params: { epochId: epoch.id },
  }))

  return { paths, fallback: true }
}

/**
 * Use the page path params - the epoch id - with the ApolloClient instance
 * to retrieve the Epoch details.
 * Add the epoch as a prop onto the SSR page
 * @param {import('next').GetStaticPropsContext} ctx
 * @returns {import('next').GetStaticProps}
 */
export const getStaticProps = async ({ params }) => {
  const epochId = params.epochId
  const client = initApolloClient({})
  const { data } = await client.query({
    query: EPOCH_QUERY,
    fetchPolicy: 'cache-first',
    variables: { id: epochId },
  })

  return {
    props: {
      epoch: data?.epoch,
    },
  }
}

export default EpochDetailsPage
